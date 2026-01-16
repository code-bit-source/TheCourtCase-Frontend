import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import QuickActionCard from '@/components/dashboard/QuickActionCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Briefcase, 
  Calendar, 
  FileText, 
  MessageSquare,
  Upload,
  Phone,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Video
} from 'lucide-react';

const ClientHome = () => {
  // Mock data - replace with real data from API
  const stats = [
    {
      title: "Active Cases",
      value: "3",
      icon: Briefcase,
      description: "2 in progress, 1 pending",
    },
    {
      title: "Upcoming Hearings",
      value: "2",
      icon: Calendar,
      description: "Next: Dec 15, 2024",
    },
    {
      title: "Documents",
      value: "24",
      icon: FileText,
      description: "8 pending review",
    },
    {
      title: "Messages",
      value: "5",
      icon: MessageSquare,
      description: "3 unread",
    }
  ];

  const quickActions = [
    {
      title: "Upload Documents",
      description: "Add case documents",
      icon: Upload,
      iconColor: "bg-blue-100 text-blue-600"
    },
    {
      title: "Message Advocate",
      description: "Send a message",
      icon: MessageSquare,
      iconColor: "bg-green-100 text-green-600"
    },
    {
      title: "Schedule Meeting",
      description: "Book consultation",
      icon: Calendar,
      iconColor: "bg-purple-100 text-purple-600"
    },
    {
      title: "View Invoices",
      description: "Payment history",
      icon: DollarSign,
      iconColor: "bg-orange-100 text-orange-600"
    }
  ];

  const myCases = [
    {
      id: "CASE-001",
      title: "Property Dispute",
      status: "In Progress",
      advocate: "Adv. Rajesh Kumar",
      nextHearing: "Dec 15, 2024",
      statusColor: "bg-blue-100 text-blue-700"
    },
    {
      id: "CASE-002",
      title: "Contract Agreement",
      status: "Document Review",
      advocate: "Adv. Priya Sharma",
      nextHearing: "Dec 20, 2024",
      statusColor: "bg-yellow-100 text-yellow-700"
    },
    {
      id: "CASE-003",
      title: "Family Matter",
      status: "Pending",
      advocate: "Adv. Amit Patel",
      nextHearing: "Jan 5, 2025",
      statusColor: "bg-gray-100 text-gray-700"
    }
  ];

  const upcomingEvents = [
    {
      title: "Court Hearing - Property Dispute",
      date: "Dec 15, 2024",
      time: "10:00 AM",
      location: "District Court, Room 203",
      type: "hearing"
    },
    {
      title: "Consultation with Advocate",
      date: "Dec 18, 2024",
      time: "3:00 PM",
      location: "Video Call",
      type: "meeting"
    },
    {
      title: "Document Submission Deadline",
      date: "Dec 20, 2024",
      time: "5:00 PM",
      location: "Online Portal",
      type: "deadline"
    }
  ];

  const getEventIcon = (type) => {
    switch(type) {
      case 'hearing': return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'meeting': return <Video className="h-4 w-4 text-blue-600" />;
      case 'deadline': return <Clock className="h-4 w-4 text-orange-600" />;
      default: return <Calendar className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <DashboardLayout 
      title="Client Dashboard" 
      subtitle="Track your cases and stay updated"
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
        {/* My Cases - Takes 2 columns */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                My Cases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myCases.map((caseItem, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{caseItem.title}</h3>
                        <p className="text-sm text-gray-500">{caseItem.id}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${caseItem.statusColor}`}>
                        {caseItem.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Advocate</p>
                        <p className="font-medium text-gray-900">{caseItem.advocate}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Next Hearing</p>
                        <p className="font-medium text-gray-900">{caseItem.nextHearing}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events - Takes 1 column */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="pb-4 border-b last:border-0">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {getEventIcon(event.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                        <div className="mt-2 space-y-1">
                          <p className="text-xs text-gray-600 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {event.date}
                          </p>
                          <p className="text-xs text-gray-600 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {event.time}
                          </p>
                          <p className="text-xs text-gray-600">{event.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Documents */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Recent Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['Contract_Draft.pdf', 'Evidence_Photos.zip', 'Witness_Statement.docx'].map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{doc}</span>
                    </div>
                    <Button size="sm" variant="ghost">View</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientHome;
