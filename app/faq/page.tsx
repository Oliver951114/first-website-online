"use client";

import React, { useState } from 'react';
import styles from './page.module.css';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "什麼是 React？",
    answer: "React 是一個由 Facebook 開發的開源 JavaScript 函式庫，用於建立使用者介面。它允許開發者建立大型的網頁應用程式，其中資料可以改變，而不需要重新載入頁面。"
  },
  {
    question: "為什麼要使用 Next.js？",
    answer: "Next.js 是一個基於 React 的框架，提供了許多優化功能，如伺服器端渲染、靜態網站生成、自動程式碼分割等，能夠大幅提升應用程式的效能和開發效率。"
  },
  {
    question: "如何開始使用這個專案？",
    answer: "您可以透過克隆專案儲存庫，安裝依賴套件，然後運行開發伺服器來開始使用。詳細的步驟請參考專案的 README 文件。"
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>常見問題</h1>
        <p>以下是我們最常被問到的問題</p>
      </header>

      <section className={styles.faqList}>
        {faqData.map((faq, index) => (
          <div key={index} className={styles.faqItem}>
            <div 
              className={styles.questionHeader}
              onClick={() => toggleFAQ(index)}
            >
              <h2 className={styles.question}>{faq.question}</h2>
              <span className={`${styles.arrow} ${openIndex === index ? styles.arrowUp : ''}`}>
                ▼
              </span>
            </div>
            <div className={`${styles.answerContainer} ${openIndex === index ? styles.open : ''}`}>
              <p className={styles.answer}>{faq.answer}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
