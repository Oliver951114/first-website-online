import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// 初始化 OpenAI 客戶端
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 檢查 API 金鑰是否存在
if (!process.env.OPENAI_API_KEY) {
  console.error('錯誤：未設置 OPENAI_API_KEY 環境變數');
}

export async function POST(request: Request) {
  try {
    // 檢查 API 金鑰是否存在
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: '未設置 API 金鑰' },
        { status: 500 }
      );
    }

    // 從請求中獲取使用者訊息
    const { message } = await request.json();

    // 檢查訊息是否存在
    if (!message) {
      return NextResponse.json(
        { error: '訊息不能為空' },
        { status: 400 }
      );
    }

    // 調用 OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `你是台大資訊系統訓練班的專職客服人員，你的職責僅限於回答與台大資訊系統訓練班相關的課程資訊和服務問題。

你可以回答的範圍：
1. 課程相關資訊（上課時間、地點、課程內容）
2. 報名相關問題
3. 聯絡資訊
4. 訓練班基本資訊

你必須嚴格遵守以下規則：
1. 只能回答與台大資訊系統訓練班直接相關的問題
2. 不能回答任何程式設計、技術問題或提供程式碼
3. 不能回答與訓練班無關的一般性問題
4. 如果遇到超出範圍的問題，必須明確告知這是超出你的職責範圍

你可以使用的資訊：
- 聯絡電話：02-2345-6789
- 地址：羅斯福路六段1號
- 上課時間：週一～週五 09:30~11:30

請用繁體中文回答，並在適當的時候提供這些資訊。如果遇到無法回答的問題，請誠實告知並建議對方直接撥打電話詢問。`
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    // 獲取 AI 的回應
    const aiResponse = completion.choices[0].message.content;

    // 回傳 AI 的回應
    return NextResponse.json({ 
      message: aiResponse 
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: '處理請求時發生錯誤' },
      { status: 500 }
    );
  }
}
