import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  console.log('API処理開始');
  
  try {
    const data = await request.json();
    
    // 環境変数の確認
    console.log('環境変数の状態:', {
      EMAIL_USER: process.env.EMAIL_USER ? '設定済み' : '未設定',
      APP_PASSWORD: process.env.EMAIL_APP_PASSWORD ? '設定済み' : '未設定',
      PASSWORD_LENGTH: process.env.EMAIL_APP_PASSWORD?.length
    });

    // Gmail設定を直接指定してテスト
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'michill.kyujin@gmail.com',  // メールアドレスを直接指定
        pass: 'pqxs ijmt ouwx mtgr'  // アプリパスワードを直接指定
      }
    });

    console.log('トランスポーター作成完了');

    // 接続テスト
    try {
      await transporter.verify();
      console.log('SMTP接続テスト成功');
    } catch (verifyError) {
      console.error('SMTP接続テストエラー:', verifyError);
      throw verifyError;
    }

    const mailOptions = {
      from: '"採用担当" <michill.kyujin@gmail.com>',
      to: 'michill.kyujin@gmail.com',
      subject: `【採用応募】${data.lastName}${data.firstName}様からの応募`,
      text: `
お名前: ${data.lastName} ${data.firstName}
電話番号: ${data.phone}
メールアドレス: ${data.email || '未入力'}
美容師歴: ${data.experience || '未入力'}
メッセージ: ${data.message || '未入力'}

送信日時: ${new Date().toLocaleString('ja-JP')}
      `.trim()
    };

    console.log('メール送信開始');
    const info = await transporter.sendMail(mailOptions);
    console.log('メール送信成功:', info);

    return NextResponse.json(
      { message: '送信が完了しました' },
      { status: 200 }
    );

  } catch (error) {
    console.error('エラーの詳細:', {
      name: error.name,
      message: error.message,
      code: error.code,
      command: error.command
    });

    return NextResponse.json(
      { error: 'メール送信に失敗しました' },
      { status: 500 }
    );
  }
} 