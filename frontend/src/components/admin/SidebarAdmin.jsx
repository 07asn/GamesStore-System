import { 
  LayoutDashboard, 
  Users, 
  Layers, 
  Package, 
  ShoppingCart, 
  Warehouse,
  Ticket,
  MessageSquare,
  Mail,
  LogOut,
  ArrowLeft
} from 'lucide-react';

const SidebarAdmin = ({ setSelectedTab, selectedTab }) => {
  const menuItems = [
    { id: 'Statistics', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'Users', label: 'Users', icon: <Users className="w-5 h-5" /> },
    { id: 'Categories', label: 'Categories', icon: <Layers className="w-5 h-5" /> },
    { id: 'Products', label: 'Products', icon: <Package className="w-5 h-5" /> },
    { id: 'Orders', label: 'Orders', icon: <ShoppingCart className="w-5 h-5" /> },
    { id: 'Inventory', label: 'Inventory', icon: <Warehouse className="w-5 h-5" /> },
    { id: 'Coupons', label: 'Coupons', icon: <Ticket className="w-5 h-5" /> },
    { id: 'Comments', label: 'Comments', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'Messages', label: 'Messages', icon: <Mail className="w-5 h-5" /> }
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen w-64 bg-gradient-to-b from-slate-800 to-slate-900 text-gray-100 shadow-xl flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold tracking-wider flex items-center gap-2">
          <span className="bg-blue-500 w-8 h-8 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">A</span>
          </span>
          Admin Panel
        </h1>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-4 space-y-1">
          {menuItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => setSelectedTab(item.id)}
              className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200
                ${selectedTab === item.id 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-300 hover:bg-slate-700'}`}
            >
              {item.icon}
              <span className="text-base font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-slate-700 space-y-2">
        <button 
          onClick={() => window.location.href = "/"}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-slate-700 rounded-lg transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-base font-medium">Back to Website</span>
        </button>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-red-600 hover:text-white rounded-lg transition-colors duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-base font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SidebarAdmin;