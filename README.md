├── public
│   └── MicrosoftYaHei.ttf（微软雅黑字体文件，指定CreDAO中使用微软雅黑全局字体）
│   └── index.html
│   └── manifest.json
├── src（95%以上的项目文件存放在该文件夹下）
│   ├── components（组件文件夹，在React中，将可复用的代码写成组件的形式，方便调用）
│   │   |── NavBar（顶部导航栏）
│   │   |   └── Navbar.tsx（顶部导航栏组件）
│   │   |   └── icons.tsx（顶部导航栏用到的svg文件，logo也包含在内）
│   │   |── SearchBar（搜索栏）
│   │   |   └── SearchBar.tsx（搜索栏组件）
│   │   |   └── icons.tsx（搜索栏用到的svg文件）
│   │   |── SideBar（侧边导航栏）
│   │   |   └── SideBar.tsx（侧边导航栏组件）
│   │   |   └── icons.tsx（侧边导航栏用到的svg文件）
│   │   |── Video（视频功能）
│   │   |   └── VideoCard.tsx（视频卡片组件，指在首页中看到的视频详情信息）
│   │   |   └── VideoDetail.tsx（视频详情组件，涉及视频播放页）
│   │   |   └── VideoList.tsx（视频列表组件，将视频卡片以列表的方式呈现）
│   │   |   └── VideoTypes.tsx（视频属性定义，包括视频ID等等）
│   │   |   └── icons.tsx（视频功能用到的svg文件）
│   │   |── Wallet（钱包功能）
│   │   |    |── Transaction（底部交易展示）
│   │   |    |   └── List.tsx（交易列表）
│   │   |    |   └── Overview.tsx（交易详情）
│   │   |    └── API.tsx（废文件，没用，但不要删）
│   │   |    └── Home.tsx（展示钱包主界面设计）
│   │   |    └── Transform.tsx（转换，将钱包地址和账户余额转换为指定的格式）
│   │   |    └── icons.tsx（钱包功能用到的svg文件）
│   │   |    └── useMetamask.tsx（与metamask交互）
│   │   └── Feed.tsx（用于首页响应，在选择侧边栏&搜索功能后，呈现出对应的视频列表）
│   │   └── Loader.tsx（当搜索无响应时，出现加载状态的组件）
│   └── API.ts（youtube API文件）
│   └── App.css
│   └── App.test.tsx
│   └── App.tsx（前端渲染文件）
│   └── index.css
│   └── index.tsx
│   └── react-app-env.d.ts
│   └── reportWebVitals.ts
│   └── setupTests.ts
