import React, { useState } from 'react';
import { Mail, MapPin, MessageCircle, Send, Sparkles, UserRound } from 'lucide-react';
import SectionHeader from '../components/SectionHeader.jsx';

const emailConfig = {
  serviceId: 'service_f6w8fy6',
  templateId: 'template_wsjzgns',
  publicKey: 'iG8lSBwRWLnDBcjeQ',
};

const contactItems = [
  { icon: UserRound, label: '姓名', value: '李民昊' },
  { icon: Sparkles, label: '方向', value: 'AIGC视觉设计 / AI短视频创作 / UI设计' },
  { icon: Mail, label: '邮箱', value: 'l15515479790@163.com' },
  { icon: MessageCircle, label: '微信', value: '15515479790' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const updateField = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('sending');
    setStatusMessage('正在发送，请稍候...');

    const payload = {
      service_id: emailConfig.serviceId,
      template_id: emailConfig.templateId,
      user_id: emailConfig.publicKey,
      template_params: {
        from_name: formData.name || '未填写',
        contact: formData.contact || '未填写',
        subject: formData.subject || 'AIGC作品集网站联系',
        message: formData.message || '未填写',
      },
    };

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('EmailJS request failed');
      }

      setStatus('success');
      setStatusMessage('发送成功，我会尽快回复您。');
      setFormData({ name: '', contact: '', subject: '', message: '' });
    } catch {
      setStatus('error');
      setStatusMessage('发送失败，请稍后重试，或直接发送邮件到 l15515479790@163.com。');
    }
  };

  return (
    <section className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <SectionHeader
        eyebrow="06 / Contact"
        title="联系我"
        description="欢迎围绕 AIGC 视觉设计、商业海报、AI 短视频、作品合作或岗位机会进行沟通。"
      />

      <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
        <aside className="tech-card corner-frame p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.32em] text-zinc-500">Communication</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">项目与岗位沟通</h2>
          <p className="mt-4 text-sm leading-7 text-zinc-400">可以直接通过邮箱或微信联系，也可以填写右侧表单说明合作方向、岗位需求或作品替换建议。</p>

          <div className="mt-8 grid gap-4">
            {contactItems.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-4 rounded-[10px] border border-white/10 bg-white/[0.035] p-4">
                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] border border-white/14 bg-white/[0.045] text-white">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-xs text-zinc-500">{label}</p>
                  <p className="mt-1 text-sm font-medium leading-6 text-white">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-6 text-sm text-zinc-500">
            <MapPin size={17} />
            中国 / 北京
          </div>
        </aside>

        <form className="tech-card p-6 sm:p-8" onSubmit={handleSubmit}>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm text-zinc-400">
              姓名
              <input
                className="form-field"
                placeholder="请输入您的姓名"
                value={formData.name}
                onChange={(event) => updateField('name', event.target.value)}
              />
            </label>
            <label className="grid gap-2 text-sm text-zinc-400">
              邮箱 / 电话
              <input
                className="form-field"
                placeholder="请输入联系方式"
                value={formData.contact}
                onChange={(event) => updateField('contact', event.target.value)}
              />
            </label>
          </div>
          <label className="mt-5 grid gap-2 text-sm text-zinc-400">
            沟通主题
            <input
              className="form-field"
              placeholder="合作、岗位、项目或其他需求"
              value={formData.subject}
              onChange={(event) => updateField('subject', event.target.value)}
            />
          </label>
          <label className="mt-5 grid gap-2 text-sm text-zinc-400">
            留言
            <textarea
              className="form-field min-h-44 resize-y"
              placeholder="请简单描述您的需求"
              value={formData.message}
              onChange={(event) => updateField('message', event.target.value)}
            />
          </label>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="primary-button mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'sending' ? '发送中...' : '发送信息'} <Send size={17} />
          </button>
          {statusMessage && (
            <p className={`mt-3 text-xs leading-5 ${status === 'success' ? 'text-emerald-300' : status === 'error' ? 'text-red-300' : 'text-zinc-500'}`}>
              {statusMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
