'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    experience: '',
    phone: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('送信が完了しました');
        setFormData({
          lastName: '',
          firstName: '',
          experience: '',
          phone: '',
          message: ''
        });
      } else {
        alert('送信に失敗しました。もう一度お試しください。');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('送信に失敗しました。もう一度お試しください。');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-lg mx-auto">
        <Link href="/" className="text-gray-600 hover:text-gray-800 mb-8 inline-block">
          ← 戻る
        </Link>
        
        <h1 className="text-2xl font-bold mb-8 text-center">応募フォーム</h1>
        
        <form 
          onSubmit={handleSubmit} 
          className="space-y-6"
          noValidate
        >
          <div className="flex gap-4">
            <div className="flex-1">
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
            <div className="flex-1">
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              美容師歴
            </label>
            <select 
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            >
              <option value="">選択してください</option>
              <option value="1-3年">1-3年</option>
              <option value="4-6年">4-6年</option>
              <option value="7-9年">7-9年</option>
              <option value="10年以上">10年以上</option>
            </select>
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
              勤務に関する不安などありましたら遠慮なくご記入ください
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              rows="4"
            ></textarea>
          </div>

          <button 
            type="submit"
            className="bg-[#e24a4a] text-white px-8 py-3 rounded-full w-full hover:bg-[#bd3535] transition duration-300"
          >
            送信する
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage; 