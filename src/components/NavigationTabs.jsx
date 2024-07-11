import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const routeTabs = {
  '/Chamados/NovoChamado': [
    { label: 'Em andamento', route: '/Chamados/EmAndamento' },
    { label: 'Novo Chamado', route: '/Chamados/NovoChamado' },
  ],
  '/Chamados/EmAndamento': [
    { label: 'Em andamento', route: '/Chamados/EmAndamento' },
    { label: 'Novo Chamado', route: '/Chamados/NovoChamado' },
  ],
  '/': [
    { label: 'Home', route: '/' },
  ],
  '/Pedidos/NovoPedido': [
    { label: 'Novo Pedido', route: '/Pedidos/NovoPedido' },
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