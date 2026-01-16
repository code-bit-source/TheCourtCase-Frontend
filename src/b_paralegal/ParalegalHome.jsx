import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import QuickActionCard from '@/components/dashboard/QuickActionCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ClipboardList, 
  FileText, 
  Search, 
  Calendar,
  CheckCircle,
  Clock,
  Upload,
  BookOpen,
  Folder,
  AlertCircle,
  TrendingUp,
  Users
} from 'lucide-react';

const ParalegalHome = () => {
  // Mock data - replace with real data from API
  const stats = [
    {
      title: "Assigned Tasks",
      value: "15",
      icon: ClipboardList,
      description: "8 in progress, 7 pending",
      trend: { value: "3 new", isPositive: true }
    },
    {
      title: "Documents Prepared",
      value: "28",
      icon: FileText,
      description: "This month",
      trend: { value: "12%", isPositive: true }
    },
    {
      title: "Research Tasks",
      value: "6",
      icon: Search,
      description: "4 completed, 2 ongoing",
    },
    {
      title: "Deadlines Today",
      value: "3",
      icon: Clock,
      description: "All on track",
    }
  ];

  const quickActions = [
    {
      title: "Document Prep",
      description: "Create legal documents",
      icon: FileText,
      iconColor: "bg-blue-100 text-blue-600"
    },
    {
      title: "Legal Research",
      description: "Access databases",
      icon: Search,
      iconColor: "bg-purple-100 text-purple-600"
    },
    {
      title: "File Management",
      description: "Organize case files",
      icon: Folder,
      iconColor: "bg-green-100 text-green-600"
    },
    {
      title: "Schedule Tasks",
      description: "Manage calendar",
      icon: Calendar,
      iconColor: "bg-orange-100 text-orange-600"
    }
  ];

  const assignedTasks = [
    {
      id: "TASK-001",
      title: "Draft Affidavit - Property Case",
      assignedBy: "Adv. Rajesh Kumar",
      case: "CASE-2024-001",
      deadline: "Today, 5:00 PM",
      status: "In Progress",
      priority: "High",
      statusColor: "bg-yellow-100 text-yellow-700",
      priorityColor: "border-red-200"
    },
    {
      id: "TASK-002",
      title: "Legal Research - Contract Law",
      assignedBy: "Adv. Priya Sharma",
      case: "CASE-2024-015",
      deadline: "Tomorrow",
      status: "Not Started",
      priority: "Medium",
      statusColor: "bg-gray-100 text-gray-700",
      priorityColor: "border-yellow-200"
    },
    {
      id: "TASK-003",
      title: "Organize Case Documents",
      assignedBy: "Adv. Amit Patel",
      case: "CASE-2024-023",
      deadline: "Dec 18, 2024",
      status: "In Progress",
      priority: "Low",
      statusColor: "bg-blue-100 text-blue-700",
      priorityColor: "border-green-200"
    }
  ];

  const recentDocuments = [
    {
      name: "Affidavit_Draft_v2.docx",
      case: "CASE-2024-001",
      date: "Today, 2:30 PM",
      status: "Draft"
    },
    {
      name: "Research_Notes_Contract.pdf",
      case: "CASE-2024-015",
      date: "Yesterday",
      status: "Completed"
    },
    {
      name: "Witness_List.xlsx",
      case: "CASE-2024-023",
      date: "Dec 10, 2024",
      status: "Under Review"
    },
    {
      name: "Evidence_Summary.docx",
      case: "CASE-2024-001",
      date: "Dec 9, 2024",
      status: "Completed"
    }
  ];

  const assignedCases = [
    {
      caseId: "CASE-2024-001",
      title: "Property Dispute",
      advocate: "Adv. Rajesh Kumar",
      tasksCount: 5,
      completedTasks: 3
    },
    {
      caseId: "CASE-2024-015",
      title: "Contract Breach",
      advocate: "Adv. Priya Sharma",
      tasksCount: 4,
      completedTasks: 2
    },
    {
      caseId: "CASE-2024-023",
      title: "Family Settlement",
      advocate: "Adv. Amit Patel",
      tasksCount: 3,
      completedTasks: 1
    }
  ];

  const researchTools = [
    { name: "Legal Database", icon: BookOpen, color: "text-blue-600" },
    { name: "Case Law Search", icon: Search, color: "text-purple-600" },
    { name: "Document Templates", icon: FileText, color: "text-green-600" },
    { name: "Citation Guide", icon: BookOpen, color: "text-orange-600" }
  ];

  return (
    <DashboardLayout 
      title="Paralegal Dashboard" 
      subtitle="Manage tasks and support case preparation"
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
        {/* Assigned Tasks - Takes 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                Assigned Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignedTasks.map((task, index) => (
                  <div key={index} className={`border-2 rounded-lg p-4 hover:shadow-md transition-shadow ${task.priorityColor}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{task.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{task.id} • {task.case}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${task.statusColor}`}>
                        {task.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-gray-500">Assigned By</p>
                        <p className="font-medium text-gray-900">{task.assignedBy}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Deadline</p>
                        <p className="font-medium text-gray-900">{task.deadline}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Priority</p>
                        <p className="font-medium text-gray-900">{task.priority}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        View Details
                      </Button>
                      <Button size="sm" variant="default">
                        Mark Complete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Recent Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg border">
                    <div className="flex items-center gap-3 flex-1">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                        <p className="text-xs text-gray-500">{doc.case} • {doc.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        doc.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        doc.status === 'Draft' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {doc.status}
                      </span>
                      <Button size="sm" variant="ghost">View</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Takes 1 column */}
        <div className="space-y-6">
          {/* Assigned Cases */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Folder className="h-5 w-5" />
                Assigned Cases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignedCases.map((caseItem, index) => (
                  <div key={index} className="p-3 border rounded-lg hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-sm text-gray-900">{caseItem.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{caseItem.caseId}</p>
                    <p className="text-xs text-gray-600 mt-2">{caseItem.advocate}</p>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{caseItem.completedTasks}/{caseItem.tasksCount} tasks</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${(caseItem.completedTasks / caseItem.tasksCount) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Research Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Research Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {researchTools.map((tool, index) => (
                  <Button 
                    key={index}
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => console.log(`Opening: ${tool.name}`)}
                  >
                    <tool.icon className={`h-4 w-4 mr-2 ${tool.color}`} />
                    {tool.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Stats */}
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
                  <span className="text-sm text-gray-600">Tasks Completed</span>
                  <span className="text-sm font-bold text-green-600">42</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Documents Created</span>
                  <span className="text-sm font-bold text-blue-600">28</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Research Reports</span>
                  <span className="text-sm font-bold text-purple-600">15</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">On-Time Delivery</span>
                  <span className="text-sm font-bold text-orange-600">98%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ParalegalHome;
