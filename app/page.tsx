import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <header className="relative h-[60vh] flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://picsum.photos/1920/1080" 
            alt="Header Background" 
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-6xl font-bold text-gray-800 mb-6">
            Andy的AI Lab
          </h1>
          <p className="text-2xl text-gray-600">
            探索人工智慧的無限可能，打造智慧未來
          </p>
        </div>
      </header>

      {/* Services Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            我們的服務
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI 模型開發",
                description: "客製化 AI 模型開發與訓練",
                image: "https://picsum.photos/400/300?random=1"
              },
              {
                title: "資料分析",
                description: "大數據分析與視覺化",
                image: "https://picsum.photos/400/300?random=2"
              },
              {
                title: "AI 顧問服務",
                description: "企業 AI 轉型策略規劃",
                image: "https://picsum.photos/400/300?random=3"
              }
            ].map((service, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_25px_-5px_rgba(255,127,80,0.2)]"
              >
                <div className="relative overflow-hidden">
                  <Image 
                    src={service.image} 
                    alt={service.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 transition-colors duration-300 group-hover:text-[#FF7F50]">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            精選作品集
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "智慧客服系統",
                description: "整合 NLP 的智能客服解決方案",
                image: "https://picsum.photos/400/300?random=4"
              },
              {
                title: "預測分析平台",
                description: "企業營收預測與分析系統",
                image: "https://picsum.photos/400/300?random=5"
              },
              {
                title: "影像辨識應用",
                description: "工業自動化品質檢測系統",
                image: "https://picsum.photos/400/300?random=6"
              }
            ].map((project, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            聯絡我們
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#FF7F50] rounded-full flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">電子郵件</h3>
                  <p className="text-gray-600">contact@andyailab.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#FF7F50] rounded-full flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">電話</h3>
                  <p className="text-gray-600">+886 2 1234 5678</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#FF7F50] rounded-full flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">地址</h3>
                  <p className="text-gray-600">台北市信義區信義路五段7號</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-8">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#FF7F50] focus:border-[#FF7F50]"
                    placeholder="請輸入您的姓名"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">電子郵件</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#FF7F50] focus:border-[#FF7F50]"
                    placeholder="請輸入您的電子郵件"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">訊息</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#FF7F50] focus:border-[#FF7F50]"
                    placeholder="請輸入您的訊息"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#FF7F50] text-white py-3 px-6 rounded-md hover:bg-[#FF6B3D] transition-colors duration-300"
                >
                  送出訊息
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Andy的AI Lab</h3>
              <p className="text-gray-400">
                致力於推動人工智慧技術的創新與應用，為企業提供最優質的AI解決方案。
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">快速連結</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">首頁</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">服務</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">作品集</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">聯絡我們</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">社群媒體</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">訂閱電子報</h4>
              <p className="text-gray-400 mb-4">訂閱我們的電子報，獲取最新AI技術資訊</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="請輸入您的電子郵件"
                  className="px-4 py-2 w-full rounded-l-md focus:outline-none text-gray-800"
                />
                <button className="bg-[#FF7F50] px-4 py-2 rounded-r-md hover:bg-[#FF6B3D] transition-colors">
                  訂閱
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Andy的AI Lab. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
