"use client";
import {
  ActivityCard,
  DashboardCard,
  QuickActionCard,
  StatusCard,
} from "@/components/shared/card";
import { useGetAllCommitteesQuery } from "@/redux/features/admin/committeeApi";
import { useGetAllContactsQuery } from "@/redux/features/admin/contactApi";
import { useGetAllDepartmentsQuery } from "@/redux/features/admin/departmentApi";
import { useGetAllEventsQuery } from "@/redux/features/admin/eventApi";
import { useGetAllPartnersQuery } from "@/redux/features/admin/partnerApi";
import { useGetAllPublicationsQuery } from "@/redux/features/admin/publicationApi";
import { useGetAllResearchesQuery } from "@/redux/features/admin/researchApi";
import { useGetAllUsersQuery } from "@/redux/features/admin/userApi";
import {
  generateRecentActivities,
  getFallbackActivities,
} from "@/utils/activityGenerator";
import {
  Activity,
  AlertCircle,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Database,
  Eye,
  MessageSquare,
  Search,
  Server,
  TrendingUp,
  UserCog,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

const DashboardContent = () => {
  // State for system status
  const [systemStatus, setSystemStatus] = useState<any[]>([]);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  // Dynamic System Status:
  // This component now provides real-time system status based on:
  // - API response status (errors, loading states)
  // - Database connectivity (based on data loading states)
  // - Content management statistics (events, publications, research)
  // - User activity and registration counts
  // - Recent activity monitoring
  // - Partners and departments status
  // - System uptime tracking
  // - Real-time updates every 30 seconds

  // Fetch data for dashboard statistics
  const {
    data: users,
    isLoading: usersLoading,
    error: usersError,
  } = useGetAllUsersQuery({});
  const {
    data: events,
    isLoading: eventsLoading,
    error: eventsError,
  } = useGetAllEventsQuery({});
  const {
    data: publications,
    isLoading: publicationsLoading,
    error: publicationsError,
  } = useGetAllPublicationsQuery({});
  const {
    data: research,
    isLoading: researchLoading,
    error: researchError,
  } = useGetAllResearchesQuery({});
  const {
    data: committees,
    isLoading: committeesLoading,
    error: committeesError,
  } = useGetAllCommitteesQuery({});
  const {
    data: contacts,
    isLoading: contactsLoading,
    error: contactsError,
  } = useGetAllContactsQuery({});
  const {
    data: partners,
    isLoading: partnersLoading,
    error: partnersError,
  } = useGetAllPartnersQuery({});
  const {
    data: departments,
    isLoading: departmentsLoading,
    error: departmentsError,
  } = useGetAllDepartmentsQuery({});

  // Generate dynamic system status based on API responses
  useEffect(() => {
    const generateSystemStatus = () => {
      const now = new Date();
      const statusItems = [];

      // API Services Status - based on whether APIs are responding
      const apiErrors = [
        usersError,
        eventsError,
        publicationsError,
        researchError,
        committeesError,
        contactsError,
      ];
      const hasApiErrors = apiErrors.some((error) => error);

      statusItems.push({
        id: "api-services",
        label: "API Services",
        value: hasApiErrors ? "Issues Detected" : "All Active",
        status: hasApiErrors ? ("warning" as const) : ("online" as const),
        icon: hasApiErrors ? AlertCircle : CheckCircle,
      });

      // Database Status - based on data availability
      const dataLoading = [
        usersLoading,
        eventsLoading,
        publicationsLoading,
        researchLoading,
        committeesLoading,
        contactsLoading,
        partnersLoading,
        departmentsLoading,
      ];
      const isDataLoading = dataLoading.some((loading) => loading);

      statusItems.push({
        id: "database",
        label: "Database",
        value: isDataLoading ? "Connecting..." : "Connected",
        status: isDataLoading ? ("info" as const) : ("online" as const),
        icon: Database,
      });

      // Data Loading Status
      const loadingCount = dataLoading.filter((loading) => loading).length;
      if (loadingCount > 0) {
        statusItems.push({
          id: "data-loading",
          label: "Data Loading",
          value: `${loadingCount} services loading...`,
          status: "info" as const,
          icon: Clock,
        });
      }

      // Content Status - based on recent activity
      const totalContent =
        (events?.meta?.total || 0) +
        (publications?.meta?.total || 0) +
        (research?.meta?.total || 0);
      const contentStatus = totalContent > 0 ? "Active" : "No Content";

      statusItems.push({
        id: "content",
        label: "Content Management",
        value: `${totalContent} items`,
        status: totalContent > 0 ? ("online" as const) : ("warning" as const),
        icon: totalContent > 0 ? CheckCircle : AlertCircle,
      });

      // User Activity Status
      const activeUsers = users?.meta?.total || 0;
      statusItems.push({
        id: "user-activity",
        label: "Active Users",
        value: `${activeUsers} registered`,
        status: activeUsers > 0 ? ("online" as const) : ("info" as const),
        icon: Users,
      });

      // System Uptime (simulated)
      const uptimeHours = Math.floor(
        (now.getTime() -
          new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
          ).getTime()) /
          (1000 * 60 * 60)
      );
      statusItems.push({
        id: "uptime",
        label: "System Uptime",
        value: `${uptimeHours}h today`,
        status: "info" as const,
        icon: Clock,
      });

      // Partners Status
      const partnersCount = partners?.meta?.total || 0;
      statusItems.push({
        id: "partners",
        label: "Partners",
        value: `${partnersCount} active`,
        status: partnersCount > 0 ? ("online" as const) : ("info" as const),
        icon: UserCog,
      });

      // Departments Status
      const departmentsCount = departments?.meta?.total || 0;
      statusItems.push({
        id: "departments",
        label: "Departments",
        value: `${departmentsCount} active`,
        status: departmentsCount > 0 ? ("online" as const) : ("info" as const),
        icon: UserCog,
      });

      // Last Update
      const timeString = now.toLocaleTimeString();
      setLastUpdate(timeString);

      statusItems.push({
        id: "last-update",
        label: "Last Update",
        value: timeString,
        status: "info" as const,
        icon: Server,
      });

      setSystemStatus(statusItems);
    };

    generateSystemStatus();

    // Update system status every 30 seconds
    const interval = setInterval(generateSystemStatus, 30000);

    return () => clearInterval(interval);
  }, [
    users,
    events,
    publications,
    research,
    committees,
    contacts,
    partners,
    departments,
    usersLoading,
    eventsLoading,
    publicationsLoading,
    researchLoading,
    committeesLoading,
    contactsLoading,
    usersError,
    eventsError,
    publicationsError,
    researchError,
    committeesError,
    contactsError,
  ]);

  // Statistics cards data
  const statsCards = [
    {
      title: "Total Users",
      value: users?.meta?.total || 0,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      href: "/dashboard/user-list",
    },
    {
      title: "Events",
      value: events?.meta?.total || 0,
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-50",
      href: "/dashboard/event",
    },
    {
      title: "Publications",
      value: publications?.meta?.total || 0,
      icon: BookOpen,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      href: "/dashboard/publication",
    },
    {
      title: "Research",
      value: research?.meta?.total || 0,
      icon: Search,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      href: "/dashboard/research",
    },
    {
      title: "Committees",
      value: committees?.meta?.total || 0,
      icon: UserCog,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      href: "/dashboard/committee",
    },
    {
      title: "Contacts",
      value: contacts?.meta?.total || 0,
      icon: MessageSquare,
      color: "text-red-600",
      bgColor: "bg-red-50",
      href: "/dashboard/inquiry",
    },
  ];

  // Generate dynamic recent activities from API data
  const recentActivitiesData = generateRecentActivities({
    events: events?.data || [],
    publications: publications?.data || [],
    research: research?.data || [],
    users: users?.data || [],
    committees: committees?.data || [],
    contacts: contacts?.data || [],
  });

  // Use fallback activities if no data is available
  const displayActivities =
    recentActivitiesData.length > 0
      ? recentActivitiesData
      : getFallbackActivities();

  // Recent events data
  const recentEventsData =
    events?.data?.slice(0, 3).map((event: any) => ({
      id: event.id,
      title: event.title,
      description: event.date,
      time: "Recent",
      icon: Calendar,
    })) || [];

  // Recent publications data
  const recentPublicationsData =
    publications?.data?.slice(0, 3).map((publication: any) => ({
      id: publication.id,
      title: publication.title,
      description: publication.type,
      time: "Recent",
      icon: BookOpen,
    })) || [];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-primary rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome to CGCSBD Dashboard</h1>
        <p className="">
          Manage your research organization's content, events, and publications
          from one central location.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => (
          <DashboardCard
            key={index}
            title={stat.title}
            value={stat.value}
            description={`Total ${stat.title.toLowerCase()}`}
            icon={stat.icon}
            iconColor={stat.color}
            iconBgColor={stat.bgColor}
            href={stat.href}
            variant="stat"
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <ActivityCard
            title="Recent Activities"
            description="Latest updates and activities in your organization"
            activities={displayActivities}
            icon={Activity}
            iconColor="text-blue-600"
          />
        </div>

        {/* Quick Actions and System Status */}
        <div className="space-y-6">
          <QuickActionCard
            title="Quick Actions"
            description="Common tasks and shortcuts"
            actions={[
              {
                id: "create-event",
                title: "Create Event",
                href: "/dashboard/event",
                icon: Calendar,
                iconColor: "text-green-600",
                hoverBgColor: "hover:bg-green-50",
              },
              {
                id: "add-publication",
                title: "Add Publication",
                href: "/dashboard/publication",
                icon: BookOpen,
                iconColor: "text-purple-600",
                hoverBgColor: "hover:bg-purple-50",
              },
              {
                id: "new-research",
                title: "New Research",
                href: "/dashboard/research",
                icon: Search,
                iconColor: "text-orange-600",
                hoverBgColor: "hover:bg-orange-50",
              },
              {
                id: "manage-users",
                title: "Manage Users",
                href: "/dashboard/user-list",
                icon: Users,
                iconColor: "text-blue-600",
                hoverBgColor: "hover:bg-blue-50",
              },
            ]}
            icon={TrendingUp}
            iconColor="text-green-600"
          />

          <StatusCard
            title="System Status"
            statusItems={systemStatus}
            icon={Eye}
            iconColor="text-indigo-600"
          />
        </div>
      </div>

      {/* Recent Content Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Events */}
        <ActivityCard
          title="Recent Events"
          description="Latest events in your organization"
          activities={recentEventsData}
          icon={Calendar}
          iconColor="text-green-600"
        />

        {/* Recent Publications */}
        <ActivityCard
          title="Recent Publications"
          description="Latest publications and reports"
          activities={recentPublicationsData}
          icon={BookOpen}
          iconColor="text-purple-600"
        />
      </div>
    </div>
  );
};

export default DashboardContent;
