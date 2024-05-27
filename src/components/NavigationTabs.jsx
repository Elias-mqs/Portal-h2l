import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const routeTabs = {
  '/novoChamado': [
    { label: 'Novo', route: '/novoChamado' },
    { label: 'Em andamento', route: '/emAndamento' },
  ],
  '/emAndamento': [
    { label: 'Novo', route: '/novoChamado' },
    { label: 'Em andamento', route: '/emAndamento' },
  ],
  '/': [
    { label: 'Home', route: '/' },
  ],
  '/pedidos': [
    { label: 'Novo Pedido', route: '/pedidos' },
  ],
};

export default function NavigationTabs() {
  const router = useRouter();
  const navTabs = routeTabs[router.pathname] || [];
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    const currentRoute = router.pathname;
    const activeTab = navTabs.find(tab => tab.route === currentRoute);
    if (activeTab) {
      setActiveTab(activeTab.label)
    }
  }, [router.pathname]);

  return { navTabs, activeTab };
}