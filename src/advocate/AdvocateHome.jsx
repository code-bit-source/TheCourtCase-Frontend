import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import QuickActionCard from '@/components/dashboard/QuickActionCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Briefcase, 
  Calendar, 
  Users, 
  CheckCircle,
  FileText,
  MessageSquare,
  Search,
  PlusCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  BookOpen
} from 'lucide-react';

const AdvocateHome = () => {
  // Mock data - replace with real data from API
  const stats = [
    {
      title: "Active Cases",
      value: "18",
      icon: Briefcase,
      description: "12 in progress, 6 pending",
      trend: { value: "3 new", isPositive: true }
    },
    {
      title: "Total Clients",
      value: "45",
      icon: Users,
      description: "8 new this month",
      trend: { value: "18%", isPositive: true }
    },
    {
      title: "Hearings This Week",
      value: "7",
      icon: Calendar,
      description: "Next: Today 2:00 PM",
    },
    {
      title: "Tasks Pending",
      value: "12",
      icon: CheckCircle,
      description: "5 due today",
    }
  ];

  const quickActions = [
    {
      title: "Add New Case",
      description: "Register new case",
      icon: PlusCircle,
      iconColor: "bg-blue-100 text-blue-600"
    },
    {
      title: "Client Messages",
      description: "View communications",
      icon: MessageSquare,
      iconColor: "bg-green-100 text-green-600"
    },
    {
      title: "Draft Document",
      description: "Create legal docs",
      icon: FileText,
      iconColor: "bg-purple-100 text-purple-600"
    },
    {
      title: "Legal Research",
      description: "Access resources",
      icon: Search,
      iconColor: "bg-orange-100 text-orange-600"
    }
  ];

  const activeCases = [
    {
      id: "CASE-2024-001",
      title: "Property Dispute - Sharma vs Kumar",
      client: "Rajesh Sharma",
      priority: "High",
      nextHearing: "Today, 2:00 PM",
      status: "Hearing Today",
      priorityColor: "bg-red-100 text-red-700 border-red-200"
    },
    {
      id: "CASE-2024-015",
      title: "Contract Breach - Tech Solutions Ltd",
      client: "Priya Patel",
      priority: "Medium",
      nextHearing: "Dec 18, 2024",
      status: "Document Review",
      priorityColor: "bg-yellow-100 text-yellow-700 border-yellow-200"
    },
    {
      id: "CASE-2024-023",
      title: "Family Settlement - Verma Family",
      client: "Amit Verma",
      priority: "Low",
      nextHearing: "Dec 25, 2024",
      status: "Negotiation",
      priorityColor: "bg-green-100 text-green-700 border-green-200"
    }
  ];

  const todaySchedule = [
    {
      time: "10:00 AM",
      title: "Client Meeting - Rajesh Sharma",
      type: "meeting",
      location: "Office"
    },
    {
      time: "2:00 PM",
      title: "Court Hearing - Property Dispute",
      type: "hearing",
      location: "District Court, Room 203"
    },
    {
      time: "4:30 PM",
      title: "Document Review - Contract Case",
      type: "task",
      location: "Office"
    },
    {
      time: "6:00 PM",
      title: "Consultation - New Client",
      type: "consultation",
      location: "Video Call"
    }
  ];

  const pendingTasks = [
    { task: "File appeal for CASE-2024-001", deadline: "Today", urgent: true },
    { task: "Review contract documents", deadline: "Tomorrow", urgent: true },
    { task: "Prepare witness list", deadline: "Dec 16", urgent: false },
    { task: "Draft settlement agreement", deadline: "Dec 18", urgent: false },
    { task: "Client follow-up calls", deadline: "This week", urgent: false }
  ];

  const getScheduleIcon = (type) => {
    switch(type) {
      case 'hearing': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'meeting': return <Users className="h-4 w-4 text-blue-600" />;
      case 'task': return <FileText className="h-4 w-4 text-purple-600" />;
      case 'consultation': return <MessageSquare className="h-4 w-4 text-green-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <DashboardLayout 
      title="Advocate Dashboard" 
      subtitle="Manage your cases and client communications"
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Cases - Takes 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Active Cases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeCases.map((caseItem, index) => (
                  <div key={index} className={`border-2 rounded-lg p-4 hover:shadow-md transition-shadow ${caseItem.priorityColor}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{caseItem.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{caseItem.id}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${caseItem.priorityColor}`}>
                        {caseItem.priority} Priority
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-gray-500">Client</p>
                        <p className="font-medium text-gray-900">{caseItem.client}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Next Hearing</p>
                        <p className="font-medium text-gray-900">{caseItem.nextHearing}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Status</p>
                        <p className="font-medium text-gray-900">{caseItem.status}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        View Case
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Pending Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingTasks.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.task}</p>
                      <p className="text-xs text-gray-500 mt-1">Due: {item.deadline}</p>
                    </div>
                    {item.urgent && (
                      <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                        Urgent
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Takes 1 column */}
        <div className="space-y-6">
          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaySchedule.map((event, index) => (
                  <div key={index} className="pb-4 border-b last:border-0">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {getScheduleIcon(event.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-500">{event.time}</p>
                        <h4 className="text-sm font-medium text-gray-900 mt-1">{event.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{event.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Cases Won</span>
                  <span className="text-sm font-bold text-green-600">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Hearings Attended</span>
                  <span className="text-sm font-bold text-blue-600">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Documents Filed</span>
                  <span className="text-sm font-bold text-purple-600">45</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Client Meetings</span>
                  <span className="text-sm font-bold text-orange-600">32</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdvocateHome;
