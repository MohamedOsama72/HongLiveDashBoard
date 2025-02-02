using Microsoft.AspNet.SignalR;

public class DashboardHub : Hub
{
    public void NotifyUpdate(string message)
    {
        Clients.All.refreshDashboard(message);
    }
}
