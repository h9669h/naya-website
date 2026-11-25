'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2, LoaderCircle, RotateCcw } from 'lucide-react';
import { api } from '@/lib/api';
import type { ContactPayload } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface FormValues {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  website: string;
}

type FieldName = keyof FormValues;
type FormErrors = Partial<Record<FieldName, string>>;

const initialValues: FormValues = {
  name: '',
  email: '',
  phone: '',
  company: '',
  subject: '',
  message: '',
  website: '',
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (values.name.trim().length < 2) errors.name = '请填写至少 2 个字符的姓名。';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = '请填写有效的邮箱地址。';
  }
  if (values.phone.trim() && !/^[+\d][\d\s()-]{5,24}$/.test(values.phone.trim())) {
    errors.phone = '请填写有效的联系电话。';
  }
  if (values.company.trim().length > 100) errors.company = '公司名称不能超过 100 个字符。';
  if (values.subject.trim().length > 120) errors.subject = '主题不能超过 120 个字符。';
  if (values.message.trim().length < 10) errors.message = '请至少用 10 个字符描述您的需求。';
  return errors;
}

export function ContactForm({ initialSubject = '' }: { initialSubject?: string }) {
  const [values, setValues] = useState<FormValues>({ ...initialValues, subject: initialSubject });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const subject = new URLSearchParams(window.location.search).get('subject');
    if (subject) setValues((current) => ({ ...current, subject: subject.slice(0, 120) }));
  }, []);

  function update(field: FieldName, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setSubmitError('');

    const firstError = Object.keys(nextErrors)[0] as FieldName | undefined;
    if (firstError) {
      document.getElementById(`contact-${firstError}`)?.focus();
      return;
    }

    setSubmitting(true);
    if (values.website) {
      setSuccess(true);
      setSubmitting(false);
      return;
    }

    const payload: ContactPayload = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim() || undefined,
      company: values.company.trim() || undefined,
      subject: values.subject.trim() || undefined,
      message: values.message.trim(),
      website: '',
    };

    try {
      await api.submitContact(payload);
      setSuccess(true);
      setValues(initialValues);
      setErrors({});
    } catch (reason: unknown) {
      setSubmitError(reason instanceof Error ? reason.message : '提交失败，请稍后重试。');
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div
        className="flex min-h-[520px] flex-col items-center justify-center rounded-3xl border border-primary/15 bg-card p-8 text-center shadow-soft"
        role="status"
      >
        <span className="grid size-20 place-items-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="size-10" />
        </span>
        <h2 className="mt-7 text-2xl font-semibold">信息已成功提交</h2>
        <p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground">
          感谢您的信任。请留意您填写的邮箱或电话，我们会尽快与您联系。
        </p>
        <Button type="button" variant="outline" className="mt-8" onClick={() => setSuccess(false)}>
          <RotateCcw />
          再提交一条
        </Button>
      </div>
    );
  }

  const errorText = (field: FieldName) =>
    errors[field] ? (
      <p id={`contact-${field}-error`} className="mt-2 text-xs text-destructive">
        {errors[field]}
      </p>
    ) : null;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-border/70 bg-card p-6 shadow-soft sm:p-8 lg:p-10"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="contact-name">
            姓名 <span className="text-primary">*</span>
          </Label>
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            value={values.name}
            onChange={(event) => update('name', event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            placeholder="您的姓名"
            className="mt-2.5"
            disabled={submitting}
          />
          {errorText('name')}
        </div>
        <div>
          <Label htmlFor="contact-email">
            邮箱 <span className="text-primary">*</span>
          </Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(event) => update('email', event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            placeholder="name@company.com"
            className="mt-2.5"
            disabled={submitting}
          />
          {errorText('email')}
        </div>
        <div>
          <Label htmlFor="contact-phone">联系电话</Label>
          <Input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => update('phone', event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
            placeholder="+86"
            className="mt-2.5"
            disabled={submitting}
          />
          {errorText('phone')}
        </div>
        <div>
          <Label htmlFor="contact-company">公司名称</Label>
          <Input
            id="contact-company"
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={(event) => update('company', event.target.value)}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? 'contact-company-error' : undefined}
            placeholder="您所在的公司"
            className="mt-2.5"
            disabled={submitting}
          />
          {errorText('company')}
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="contact-subject">咨询主题</Label>
          <Input
            id="contact-subject"
            name="subject"
            value={values.subject}
            onChange={(event) => update('subject', event.target.value)}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
            placeholder="您希望了解的服务或项目"
            className="mt-2.5"
            disabled={submitting}
          />
          {errorText('subject')}
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="contact-message">
            需求描述 <span className="text-primary">*</span>
          </Label>
          <Textarea
            id="contact-message"
            name="message"
            required
            rows={6}
            value={values.message}
            onChange={(event) => update('message', event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
            placeholder="请简要介绍项目背景、目标与期望时间。"
            className="mt-2.5"
            disabled={submitting}
          />
          <div className="flex justify-between gap-4">
            {errorText('message')}
            <span className="ml-auto mt-2 text-xs text-muted-foreground">
              {values.message.length} 字
            </span>
          </div>
        </div>
      </div>

      <div className="absolute left-[-9999px] top-auto size-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">网站</label>
        <input
          id="contact-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => update('website', event.target.value)}
        />
      </div>

      {submitError && (
        <p
          className="mt-6 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          {submitError}
        </p>
      )}

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-6 text-muted-foreground">
          提交即表示您同意我们仅为本次沟通使用以上信息。
        </p>
        <Button type="submit" size="lg" disabled={submitting} className="shrink-0">
          {submitting ? (
            <>
              <LoaderCircle className="animate-spin" />
              正在提交
            </>
          ) : (
            <>
              提交咨询
              <ArrowRight />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
