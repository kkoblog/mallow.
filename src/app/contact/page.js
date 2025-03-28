'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    phone: '',
    email: '',
    experience: '',
    message: '',
    licenses: [],
    position: '',
    age: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('送信中...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('送信が完了しました');
        setFormData({
          lastName: '',
          firstName: '',
          phone: '',
          email: '',
          experience: '',
          message: '',
          licenses: [],
          position: '',
          age: ''
        });
      } else {
        const error = await response.json();
        throw new Error(error.message || 'エラーが発生しました');
      }
    } catch (error) {
      setStatus(`送信に失敗しました: ${error.message}`);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      // チェックボックスの場合
      setFormData(prev => ({
        ...prev,
        licenses: checked
          ? [...(prev.licenses || []), value]
          : (prev.licenses || []).filter(item => item !== value)
      }));
    } else {
      // その他のフォーム要素の場合
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-lg mx-auto">
        <Link href="/" className="text-gray-600 hover:text-gray-800 mb-8 inline-block">
          ← 戻る
        </Link>
        
        <h1 className="text-2xl font-bold mb-8 text-center">応募フォーム</h1>
        
        <form
          action="mailto:dekanyon@icloud.com"
          method="post"
          encType="text/plain"
          onSubmit={(e) => {
            e.preventDefault();
            
            // 保有資格の処理
            const licenses = formData.licenses ? 
              (Array.isArray(formData.licenses) ? formData.licenses.join('、') : formData.licenses) : 
              '無し';

            // メール本文を作成
            const mailBody = `
お名前: ${formData.lastName} ${formData.firstName}
年齢: ${formData.age}歳
電話番号: ${formData.phone}
メールアドレス: ${formData.email}
経験年数: ${formData.experience}
保有資格: ${licenses}
現在のポジション: ${formData.position || '未選択'}
メッセージ:
${formData.message}
            `.trim();

            // メールリンクを作成（UTF-8でエンコード）
            const mailtoLink = `mailto:dekanyon@icloud.com?subject=${encodeURIComponent('採用に関するお問い合わせ')}&body=${encodeURIComponent(mailBody)}`;
            
            // メールクライアントを開く
            window.location.href = mailtoLink;
          }}
          className="space-y-6"
          noValidate
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                姓
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                名
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
              年齢
            </label>
            <input
              type="number"
              id="age"
              name="age"
              min="18"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#D3B58D] focus:border-[#D3B58D]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              電話番号
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="例：090-1234-5678"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              メールアドレス（任意）
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              美容師歴
            </label>
            <div className="space-y-2">
              {[
                "0~2年",
                "3~5年",
                "6~8年",
                "9~12年",
                "13年以上"
              ].map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    type="radio"
                    id={option}
                    name="experience"
                    value={option}
                    checked={formData.experience === option}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label htmlFor={option} className="ml-2 text-gray-700">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              保有資格（複数選択可）
            </label>
            <div className="space-y-2">
              {[
                "美容師免許",
                "管理美容師",
                "保育士資格",
                "幼稚園教諭免許"
              ].map((license) => (
                <div key={license} className="flex items-center">
                  <input
                    type="checkbox"
                    id={license}
                    name="licenses"
                    value={license}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label htmlFor={license} className="ml-2 text-gray-700">
                    {license}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              現在のポジション
            </label>
            <div className="space-y-2">
              {[
                "アシスタント",
                "スタイリスト",
                "保育士",
                "その他"
              ].map((position) => (
                <div key={position} className="flex items-center">
                  <input
                    type="radio"
                    id={position}
                    name="position"
                    value={position}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label htmlFor={position} className="ml-2 text-gray-700">
                    {position}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              勤務に対する不安などはありますか？
            </label>
            <div className="text-sm text-gray-500 mb-2">
              例）
              <ul className="ml-4">
                <li>保育園のお迎えがあるため、17時までの勤務を希望します</li>
                <li>子どもの急な発熱で急なお休みをいただくことがあります</li>
                <li>ブランクがあり、最新のトレンドやカット技術に不安があります</li>
              </ul>
            </div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              rows="6"
            ></textarea>
          </div>

          <div className="text-center">
            <button 
              type="submit"
              className="bg-[#e24a4a] text-white px-8 py-3 rounded-full w-full hover:bg-[#bd3535] transition duration-300"
            >
              送信する
            </button>
          </div>

          {status && (
            <div className={`text-center ${
              status.includes('完了') ? 'text-green-600' : 
              status.includes('失敗') ? 'text-red-600' : 
              'text-gray-600'
            }`}>
              {status}
            </div>
          )}
        </form>
      </div>
    </div>
  );
} 