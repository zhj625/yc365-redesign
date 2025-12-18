
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Sparkles, 
  Wallet, 
  Zap, 
  Droplets, 
  TrendingUp, 
  MousePointer2, 
  X, 
  Plus, 
  BarChart2,
  Gavel,
  MessageSquare,
  Layout,
  Search,
  User
} from 'lucide-react';
import { Language } from '../types';

interface Step {
  targetId: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isTransition?: boolean;
}

const STEPS_DATA: Record<Language, Step[]> = {
  en: [
    { targetId: 'welcome-tour', title: 'Welcome to YC365', description: 'The world\'s leading decentralized prediction market. Here, your insights are your assets.', icon: <Sparkles className="w-5 h-5 text-blue-500" /> },
    { targetId: 'header-search', title: 'Smart Search', description: 'Quickly find markets by keywords, candidates, or event names.', icon: <Search className="w-5 h-5 text-slate-500" /> },
    { targetId: 'header-faucet', title: 'Claim Testnet USDT', description: 'Click here to get free test tokens and start your prediction journey with zero cost.', icon: <Droplets className="w-5 h-5 text-blue-400" /> },
    { targetId: 'header-balance', title: 'Asset Overview', description: 'View your real-time balance and track your account performance at any time.', icon: <Wallet className="w-5 h-5 text-emerald-500" /> },
    { targetId: 'header-deposit', title: 'Quick Deposit', description: 'Add more assets to your wallet to participate in larger market positions.', icon: <Plus className="w-5 h-5 text-blue-600" /> },
    { targetId: 'header-profile', title: 'Personal Center', description: 'Access your dashboard, manage settings, and personalize your experience here.', icon: <User className="w-5 h-5 text-indigo-500" /> },
    { targetId: 'hero-banner', title: 'Featured Events', description: 'The carousel highlights the hottest official events and high-reward opportunities.', icon: <Zap className="w-5 h-5 text-amber-500" /> },
    { targetId: 'trending-ticker', title: 'Trend Tracker', description: 'Real-time scrolling shows the most active markets.', icon: <TrendingUp className="w-5 h-5 text-orange-500" /> },
    { targetId: 'fab-create', title: 'Create Market', description: 'Everyone is a market maker! Click here to create your own event and earn fees.', icon: <Plus className="w-5 h-5 text-blue-600" /> },
    { targetId: 'market-grid', title: 'Browse Markets', description: 'Find your interests in massive projects and participate quickly.', icon: <MousePointer2 className="w-5 h-5 text-purple-500" /> },
    { targetId: 'onboarding-market-card', title: 'Market Details', description: 'Click this card to enter the detail page to see more rules and order books.', icon: <Layout className="w-5 h-5 text-blue-500" />, isTransition: true },
    { targetId: 'market-orderbook-section', title: 'Order Book & Charts', description: 'Analyze market liquidity and price trends through order books and real-time charts.', icon: <BarChart2 className="w-5 h-5 text-indigo-500" /> },
    { targetId: 'market-rules-section', title: 'Market Rules', description: 'Check the specific resolution criteria for this market before you trade.', icon: <Gavel className="w-5 h-5 text-amber-600" /> },
    { targetId: 'market-comments-section', title: 'Community Insights', description: 'See what other traders are saying or share your own perspective.', icon: <MessageSquare className="w-5 h-5 text-purple-500" /> },
    { targetId: 'order-panel-container', title: 'Place Your Trade', description: 'Select Yes or No, enter the amount, and confirm your prediction.', icon: <Zap className="w-5 h-5 text-emerald-600" /> }
  ],
  zh: [
    { targetId: 'welcome-tour', title: '欢迎来到 YC365', description: '全球领先的去中心化预测市场。在这里，您的见解就是您的资产。', icon: <Sparkles className="w-5 h-5 text-blue-500" /> },
    { targetId: 'header-search', title: '智能搜索', description: '通过关键词、候选人或事件名称快速定位您感兴趣的市场。', icon: <Search className="w-5 h-5 text-slate-500" /> },
    { targetId: 'header-faucet', title: '领取测试币', description: '点击这里领取免费的 USDT，零门槛开始您的预测之旅。', icon: <Droplets className="w-5 h-5 text-blue-400" /> },
    { targetId: 'header-balance', title: '资产总览', description: '随时查看您的实时余额和账户变动。', icon: <Wallet className="w-5 h-5 text-emerald-500" /> },
    { targetId: 'header-deposit', title: '快捷充值', description: '向您的钱包存入更多资产，参与更大规模的市场预测。', icon: <Plus className="w-5 h-5 text-blue-600" /> },
    { targetId: 'header-profile', title: '个人中心', description: '管理您的仪表盘、设置并个性化您的体验。', icon: <User className="w-5 h-5 text-indigo-500" /> },
    { targetId: 'hero-banner', title: '精选活动', description: '轮播图为您呈现平台最热门、奖励最丰厚的官方活动。', icon: <Zap className="w-5 h-5 text-amber-500" /> },
    { targetId: 'trending-ticker', title: '趋势追踪', description: '实时滚动展示当前成交最活跃的市场趋势。', icon: <TrendingUp className="w-5 h-5 text-orange-500" /> },
    { targetId: 'fab-create', title: '发起预测', description: '每个人都是市场主理人！您可以点击这里创建属于您的预测市场。', icon: <Plus className="w-5 h-5 text-blue-600" /> },
    { targetId: 'market-grid', title: '浏览市场', description: '在海量预测项目中寻找您感兴趣的领域。', icon: <MousePointer2 className="w-5 h-5 text-purple-500" /> },
    { targetId: 'onboarding-market-card', title: '查看市场详情', description: '点击此卡片进入详情页，查看更详细的订单簿和规则。', icon: <Layout className="w-5 h-5 text-blue-500" />, isTransition: true },
    { targetId: 'market-orderbook-section', title: '订单簿与图表', description: '通过实时订单簿和价格走势图分析市场流动性。', icon: <BarChart2 className="w-5 h-5 text-indigo-500" /> },
    { targetId: 'market-rules-section', title: '结算规则', description: '下单前请务必阅读该市场的具体结算标准。', icon: <Gavel className="w-5 h-5 text-amber-600" /> },
    { targetId: 'market-comments-section', title: '社区讨论', description: '查看其他交易者的观点，或分享您对该事件的见解。', icon: <MessageSquare className="w-4 h-4 text-purple-500" /> },
    { targetId: 'order-panel-container', title: '立即下单', description: '选择立场（是/否），输入金额并确认您的预测。', icon: <Zap className="w-5 h-5 text-emerald-600" /> }
  ]
};

interface OnboardingProps { 
  show?: boolean; 
  currentStepProp: number;
  onClose?: () => void;
  onStepChange?: (index: number) => void;
  lang: Language;
}

const Onboarding: React.FC<OnboardingProps> = ({ currentStepProp, onClose, onStepChange, lang }) => {
  const [isSpotlightActive, setIsSpotlightActive] = useState(false);
  const [spotlightStyle, setSpotlightStyle] = useState<React.CSSProperties>({});
  const [tooltipPos, setTooltipPos] = useState<React.CSSProperties>({});
  const [isDark, setIsDark] = useState(false);
  
  const requestRef = useRef<number>(null);
  const steps = STEPS_DATA[lang];

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const updatePosition = useCallback(() => {
    if (currentStepProp < 0 || currentStepProp >= steps.length) return;
    const step = steps[currentStepProp];
    const element = document.getElementById(step.targetId);
    
    // 如果找不到元素，可能正在视图转换中
    if (!element || element.offsetParent === null) {
      setIsSpotlightActive(false);
      setTooltipPos({
        position: 'fixed', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        width: 320, 
        zIndex: 100000, 
        opacity: 1, 
        pointerEvents: 'auto',
        transition: 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
      });
      return;
    }

    const rect = element.getBoundingClientRect();
    
    // 元素存在但宽度为0，说明还没渲染好
    if (rect.width === 0) {
        setIsSpotlightActive(false);
        setTooltipPos(prev => ({ ...prev, opacity: 0 }));
        return;
    }

    setIsSpotlightActive(true);
    const overlayColor = isDark ? 'rgba(0, 0, 0, 0.75)' : 'rgba(15, 23, 42, 0.12)';
    const borderColor = isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(37, 99, 235, 0.4)';
    
    setSpotlightStyle({
      position: 'fixed', 
      top: rect.top - 6, 
      left: rect.left - 6,
      width: rect.width + 12, 
      height: rect.height + 12,
      borderRadius: rect.width > 120 ? '16px' : '999px',
      zIndex: 99999, 
      pointerEvents: 'none', 
      transition: 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
      border: `1.5px solid ${borderColor}`,
      boxShadow: `0 0 0 9999px ${overlayColor}, 0 0 15px ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(37,99,235,0.1)'}`,
    });

    // 智能定位算法
    const tWidth = 320;
    const tHeight = 220; 
    const margin = 24;

    let tTop = rect.bottom + margin;
    let tLeft = rect.left + rect.width / 2 - tWidth / 2;

    // 边界检测与修正
    if (tTop + tHeight > window.innerHeight) {
      tTop = rect.top - tHeight - margin;
      if (tTop < 80) { // 避开页头
        tTop = Math.max(80, rect.bottom + margin);
        // 如果上下都放不下，靠侧边放
        if (rect.left > tWidth + margin) {
            tLeft = rect.left - tWidth - margin;
            tTop = rect.top;
        } else {
            tLeft = rect.right + margin;
            tTop = rect.top;
        }
      }
    }

    // 强制限制在屏幕内
    tLeft = Math.max(margin, Math.min(window.innerWidth - tWidth - margin, tLeft));
    tTop = Math.max(80, Math.min(window.innerHeight - tHeight - margin, tTop));

    setTooltipPos({
      position: 'fixed', 
      top: tTop, 
      left: tLeft, 
      width: tWidth,
      zIndex: 100000, 
      transition: 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)', 
      opacity: 1,
      pointerEvents: 'auto',
      transform: 'none'
    });
  }, [currentStepProp, steps, isDark]);

  useEffect(() => {
    if (currentStepProp === -1) return;
    const animate = () => { updatePosition(); requestRef.current = requestAnimationFrame(animate); };
    requestRef.current = requestAnimationFrame(animate);
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [currentStepProp, updatePosition]);

  const handleNext = () => {
    const nextIndex = currentStepProp + 1;
    if (nextIndex < steps.length) {
      if (onStepChange) onStepChange(nextIndex);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStepProp > 0) {
      const prevIndex = currentStepProp - 1;
      if (onStepChange) onStepChange(prevIndex);
    }
  };

  const handleComplete = () => { 
    localStorage.setItem('yc365_tour_seen', 'true'); 
    if (onClose) onClose(); 
  };

  if (currentStepProp === -1) return null;
  const currentData = steps[currentStepProp];

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-none">
      {isSpotlightActive && (
          <div style={spotlightStyle} className="after:content-[''] after:absolute after:inset-0 after:rounded-[inherit] after:ring-1 after:ring-white/10 after:pointer-events-none"></div>
      )}
      
      <div style={tooltipPos}>
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.6)] border border-slate-200/60 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-400">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400">
                  {currentData.icon}
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-[15px] tracking-tight">{currentData.title}</h3>
            </div>
            <button onClick={handleComplete} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 transition-colors"><X className="w-4 h-4" /></button>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            {currentData.description}
            {currentData.isTransition && (
                <span className="block mt-4 text-[10px] font-black text-blue-600 dark:text-blue-500 animate-pulse uppercase tracking-widest">
                    {lang === 'zh' ? '▶ 请点击目标以继续' : '▶ CLICK TARGET TO CONTINUE'}
                </span>
            )}
          </p>
          <div className="flex items-center justify-between pt-5 border-t border-slate-100 dark:border-slate-800/50">
            <span className="text-[11px] font-black text-slate-300 dark:text-slate-700 tracking-tighter">
              {String(currentStepProp + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
            </span>
            <div className="flex gap-2">
                {currentStepProp > 0 && (
                  <button onClick={handlePrev} className="px-4 py-2 text-slate-500 dark:text-slate-400 text-xs font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                    {lang === 'zh' ? '返回' : 'Back'}
                  </button>
                )}
                <button 
                  onClick={handleNext} 
                  disabled={currentData.isTransition}
                  className={`px-6 py-2 text-white text-xs font-black rounded-xl transition-all shadow-lg active:scale-95 ${currentData.isTransition ? 'bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600 shadow-none' : 'bg-slate-900 dark:bg-blue-600 hover:opacity-90 shadow-slate-900/10'}`}
                >
                  {currentStepProp === steps.length - 1 ? (lang === 'zh' ? '完成' : 'Start') : (lang === 'zh' ? '下一步' : 'Next')}
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
