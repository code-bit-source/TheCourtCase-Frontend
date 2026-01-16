import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import QuickActionCard from '@/components/dashboard/QuickActionCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Briefcase, 
  Activity, 
  Bell,
  UserPlus,
  Settings,
  FileText,
  BarChart3,
  Shield,
  Clock
} from 'lucide-react';

const AdminHome = () => {
  // Mock data - replace with real data from API
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      icon: Users,
      description: "+12% from last month",
      trend: { value: "12%", isPositive: true }
    },
    {
      title: "Active Cases",
      value: "456",
      icon: Briefcase,
      description: "78 new this week",
      trend: { value: "8%", isPositive: true }
    },
    {
      title: "System Health",
      value: "98.5%",
      icon: Activity,
      description: "All systems operational",
      trend: { value: "0.5%", isPositive: true }
    },
    {
      title: "Pending Actions",
      value: "23",
      icon: Bell,
      description: "Requires attention",
      trend: { value: "5", isPositive: false }
    }
  ];

  const quickActions = [
    {
      title: "User Management",
      description: "Add, edit, or remove users",
      icon: UserPlus,
      iconColor: "bg-blue-100 text-blue-600"
    },
    {
      title: "System Settings",
      description: "Configure system parameters",
      icon: Settings,
      iconColor: "bg-purple-100 text-purple-600"
    },
    {
      title: "Generate Reports",
      description: "View analytics and reports",
      icon: BarChart3,
      iconColor: "bg-green-100 text-green-600"
    },
    {
      title: "Security Logs",
      description: "Monitor system security",
      icon: Shield,
      iconColor: "bg-red-100 text-red-600"
    }
  ];

  const recentActivities = [
    { user: "John Doe", action: "registered as Client", time: "2 minutes ago", type: "user" },
    { user: "Jane Smith", action: "created a new case", time: "15 minutes ago", type: "case" },
    { user: "Mike Johnson", action: "updated profile", time: "1 hour ago", type: "update" },
    { user: "Sarah Williams", action: "uploaded documents", time: "2 hours ago", type: "document" },
    { user: "System", action: "backup completed successfully", time: "3 hours ago", type: "system" }
  ];

  const getActivityIcon = (type) => {
    switch(type) {
      case 'user': return <UserPlus className="h-4 w-4 text-blue-600" />;
      case 'case': return <Briefcase className="h-4 w-4 text-green-600" />;
      case 'document': return <FileText className="h-4 w-4 text-purple-600" />;
      case 'system': return <Activity className="h-4 w-4 text-orange-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <DashboardLayout 
      title="Admin Dashboard" 
      subtitle="Manage your system and monitor activities"
    >
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <QuickActionCard 
              key={index} 
              {...action}
              onClick={() => console.log(`Clicked: ${action.title}`)}
            />
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                  <div className="mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user}</span>
                      {' '}{activity.action}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <span className="text-sm font-medium text-green-600">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Server</span>
                <span className="text-sm font-medium text-green-600">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Storage</span>
                <span className="text-sm font-medium text-green-600">78% Available</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Backup</span>
                <span className="text-sm font-medium text-green-600">Last: 3 hours ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Security</span>
                <span className="text-sm font-medium text-green-600">No Threats</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminHome;
