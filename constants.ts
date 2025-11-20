import { Category, FilterTag, Market } from "./types";
import { 
  Trophy, 
  Globe, 
  Cpu, 
  Vote, 
  TrendingUp, 
  Clapperboard, 
  Gamepad2 
} from "lucide-react";

export const CATEGORIES: Category[] = [
  { id: 'all', label: '全部', icon: null },
  { id: 'politics', label: '政治', icon: null },
  { id: 'crypto', label: '加密货币', icon: null },
  { id: 'sports', label: '体育', icon: null },
  { id: 'tech', label: '科技', icon: null },
  { id: 'culture', label: '文化', icon: null },
  { id: 'world', label: '世界', icon: null },
  { id: 'economy', label: '经济', icon: null },
];

export const FILTERS: FilterTag[] = [
  { id: 'all', label: '全部' },
  { id: 'ai', label: 'AI' },
  { id: 'election', label: '选举' },
  { id: 'sports', label: '体育' },
  { id: 'movies', label: '电影' },
  { id: 'trade', label: '贸易战' },
  { id: 'trump', label: '特朗普' },
  { id: 'ukraine', label: '乌克兰' },
  { id: 'musk', label: '埃隆·马斯克' },
  { id: 'tiktok', label: '抖音' },
];

export const MARKETS: Market[] = [
  {
    id: '1',
    title: 'T1 AD Gumayusi 会在 2025 年底之前与队伍成功续约吗？',
    iconUrl: 'https://picsum.photos/id/1/200/200', 
    percentage: 32,
    volume: '$ 14K',
    category: 'sports',
    endDate: 'Dec 31, 2025'
  },
  {
    id: '2',
    title: '参议员费特曼会在 2027 年之前因为健康原因辞职离开参议院吗？',
    iconUrl: 'https://picsum.photos/id/2/200/200',
    percentage: 70,
    volume: '$ 4K',
    category: 'politics',
    endDate: 'Jan 1, 2027'
  },
  {
    id: '3',
    title: '到 2025 年底，T1 选手 Gumayusi 还会继续留在首发名单中吗？',
    iconUrl: 'https://picsum.photos/id/3/200/200',
    percentage: 80,
    volume: '$ 2K',
    category: 'sports',
    endDate: 'Dec 31, 2025'
  },
  {
    id: '4',
    title: '到 2025 年底，传奇选手 Faker 会正式宣布退役吗？',
    iconUrl: 'https://picsum.photos/id/4/200/200',
    percentage: 50,
    volume: '$ 2K',
    category: 'sports',
    endDate: 'Dec 31, 2025'
  },
  {
    id: '5',
    title: '洛杉矶湖人队会在 2025 年 11 月 1 日之前赢得至少 5 场连胜吗？',
    iconUrl: 'https://picsum.photos/id/5/200/200',
    percentage: 40,
    volume: '$ 5K',
    category: 'sports',
    endDate: 'Nov 1, 2025'
  },
  {
    id: '6',
    title: 'FURIA 战队会在 2025 年 11 月 15 日的国际锦标赛中夺冠吗？',
    iconUrl: 'https://picsum.photos/id/6/200/200',
    percentage: 50,
    volume: '$ 3K',
    category: 'sports',
    endDate: 'Nov 15, 2025'
  },
  {
    id: '7',
    title: 'Vitality 战队能否在 2025 年 11 月 1 日之前保持 CSGO 世界排名第一？',
    iconUrl: 'https://picsum.photos/id/7/200/200',
    percentage: 50,
    volume: '$ 5K',
    category: 'sports',
    endDate: 'Nov 1, 2025'
  },
  {
    id: '8',
    title: '勒布朗·詹姆斯会在本月底之前从伤病中恢复并重返比赛阵容吗？',
    iconUrl: 'https://picsum.photos/id/8/200/200',
    percentage: 48,
    volume: '$ 5K',
    category: 'sports',
    endDate: 'Oct 31, 2025'
  },
  {
    id: '9',
    title: '比特币 (BTC) 的价格会在 2025 年底之前突破 100,000 美元大关吗？',
    iconUrl: 'https://picsum.photos/id/9/200/200',
    percentage: 37,
    volume: '$ 1M',
    category: 'crypto',
    endDate: 'Dec 31, 2025'
  },
   {
    id: '10',
    title: '前 EDG 选手 Viper (毒蛇) 会在 2025 年底之前加入 BLG 战队吗？',
    iconUrl: 'https://picsum.photos/id/10/200/200',
    percentage: 60,
    volume: '$ 20K',
    category: 'sports',
    endDate: 'Dec 31, 2025'
  },
];