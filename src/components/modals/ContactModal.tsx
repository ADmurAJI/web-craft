"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, MessageSquare, Send, X } from "lucide-react";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ContactModal = ({ isOpen, onClose }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [contactMethod, setContactMethod] = useState("");
  const [contactValue, setContactValue] = useState("");
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const resetForm = useCallback(() => {
    setFormData({ name: "", projectType: "", budget: "", message: "" });
    setContactMethod("");
    setContactValue("");
    setFormErrors([]);
    setIsSubmitting(false);
    setIsSent(false);
    setFadeOut(false);
  }, []);

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    if (isOpen && typeof window !== "undefined") {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
      inputRef.current?.focus();
    }

    return () => {
      if (typeof window !== "undefined") {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEsc);
      }
    };
  }, [isOpen, onClose]);

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleClose();
      }
    },
    [handleClose],
  );

  useEffect(() => {
    if (isOpen && typeof window !== "undefined") {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      if (typeof window !== "undefined") {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, [isOpen, handleClickOutside]);

  useEffect(() => {
    if (isSent) {
      setFadeOut(false);
      const fadeTimer = setTimeout(() => setFadeOut(true), 4000);
      const clearTimer = setTimeout(() => setIsSent(false), 5000);
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(clearTimer);
      };
    }
  }, [isSent]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFormErrors((prevErrors) => {
      const newErrors = [...prevErrors];
      switch (name) {
        case "name":
          return value.trim()
            ? newErrors.filter((err) => err !== "Имя")
            : newErrors;
        case "projectType":
          return value
            ? newErrors.filter((err) => err !== "Тип проекта")
            : newErrors;
        case "budget":
          return value
            ? newErrors.filter((err) => err !== "Бюджет")
            : newErrors;
        case "message":
          return value.trim().length >= 10
            ? newErrors.filter((err) => !err.startsWith("Подробности задачи"))
            : newErrors;
        default:
          return newErrors;
      }
    });
  };

  const validateForm = () => {
    const errors: string[] = [];
    if (!formData.name.trim()) errors.push("Имя");
    if (!formData.projectType) errors.push("Тип проекта");
    if (!formData.budget) errors.push("Бюджет");
    if (!contactMethod) errors.push("Способ связи");
    if (!contactValue.trim()) errors.push("Контакт для связи");
    return errors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors([]);
    setIsSubmitting(true);
    setIsSent(false);

    const fullMessage = `
🚀 *Новая заявка!*

👤 *Имя:* ${formData.name}
📦 *Проект:* ${formData.projectType}
💸 *Бюджет:* ${formData.budget}

📞 *Связаться через:* ${contactMethod}
🔗 *Контакт:* ${contactValue}

📝 *Описание задачи:*
${formData.message}
    `;

    try {
      const res = await fetch("/api/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          contactMethod,
          contactValue,
          text: fullMessage,
        }),
      });

      let result;
      try {
        result = await res.json();
      } catch {
        result = null;
      }

      if (!res.ok) {
        toast.error(
          `😕 Упс! Что-то пошло не так:\n${result?.message || "Не удалось отправить сообщение"}`,
          {
            position: "top-right",
            autoClose: 5000,
            pauseOnHover: true,
            draggable: true,
          },
        );

        setFormErrors(["Ошибка при отправке. Попробуйте ещё раз."]);
        return;
      }

      setFormData({ name: "", projectType: "", budget: "", message: "" });
      setContactMethod("");
      setContactValue("");
      setIsSent(true);
    } catch (err) {
      console.error(err);

      toast.error(`😕 Упс! Сетевая ошибка:\n${(err as Error).message}`, {
        position: "top-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
      });

      setFormErrors(["Ошибка при отправке. Попробуйте ещё раз."]);
    }
    setIsSubmitting(false);
  };

  if (!isOpen || typeof window === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div
        ref={modalRef}
        className="relative w-full max-w-xl mx-auto bg-background border border-border rounded-xl shadow-lg p-6 overflow-y-auto max-h-[90vh] animate-fade-in"
      >
        <button
          className="absolute top-4 right-4 z-20 text-muted-foreground hover:text-foreground transition"
          onClick={handleClose}
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <MessageSquare className="w-6 h-6 mr-3 text-primary" />
              Написать сообщение
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Имя *</Label>
                <Input
                  id="name"
                  name="name"
                  autoComplete="name"
                  ref={inputRef}
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Как к вам обращаться"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectType">Тип проекта *</Label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground focus:border-primary"
                  required
                >
                  <option value="">Выберите тип</option>
                  <option value="Лендинг / сайт">Лендинг / сайт</option>
                  <option value="SaaS / SPA / приложение">
                    SaaS / SPA / приложение
                  </option>
                  <option value="CRM / админка">CRM / админка</option>
                  <option value="telegram-bot">Telegram-бот</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Другое">Другое</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Бюджет *</Label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground focus:border-primary"
                  required
                >
                  <option value="">Ориентировочно</option>
                  <option value="lt100k">до 100 000</option>
                  <option value="100-300k">100 000 – 300 000</option>
                  <option value="300-500k">300 000 – 500 000</option>
                  <option value="gt500k">500 000 и выше</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactMethod">Способ связи *</Label>
                <select
                  id="contactMethod"
                  value={contactMethod}
                  onChange={(e) => setContactMethod(e.target.value)}
                  className="w-full border border-border rounded-md px-3 py-2 bg-background text-foreground focus:border-primary"
                >
                  <option value="">Выберите способ</option>
                  <option value="phone">Телефон</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="telegram">Telegram</option>
                  <option value="vk">ВКонтакте</option>
                  <option value="email">Email</option>
                </select>
              </div>

              {contactMethod && (
                <div className="space-y-2">
                  <Label htmlFor="contactValue">Контакт для связи *</Label>
                  {contactMethod === "phone" || contactMethod === "whatsapp" ? (
                    <Input
                      id="contactValue"
                      value={contactValue}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\+?\d{0,11}$/.test(value)) {
                          setContactValue(value);
                        }
                      }}
                      placeholder="+7..."
                      inputMode="tel"
                      required
                    />
                  ) : (
                    <Input
                      id="contactValue"
                      value={contactValue}
                      onChange={(e) => setContactValue(e.target.value)}
                      placeholder={
                        contactMethod === "email"
                          ? "example@mail.com"
                          : "@username или ссылка"
                      }
                      required
                    />
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="message">Подробности задачи</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Что нужно сделать?"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full gradient-primary text-primary-foreground hover:glow-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                    Отправляю...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Отправить сообщение
                  </>
                )}
              </Button>

              {isSent && (
                <div
                  className={`mt-4 px-4 py-3 bg-green-100 border border-green-400 rounded-md text-green-800 text-sm transition-opacity duration-1000 ease-in-out ${
                    fadeOut ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <div className="font-semibold flex items-center mb-2">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    Сообщение успешно отправлено
                  </div>
                  <p>Я свяжусь с вами в ближайшее время</p>
                </div>
              )}

              {formErrors.length > 0 && (
                <div className="mt-4 px-4 py-3 bg-destructive/10 border border-destructive rounded-md text-destructive text-sm">
                  <div className="font-semibold flex items-center mb-2">
                    <X className="w-4 h-4 mr-2 text-destructive" />
                    Заполните обязательные поля:
                  </div>
                  <ul className="list-disc list-inside space-y-1">
                    {formErrors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>,
    document.body,
  );
};
