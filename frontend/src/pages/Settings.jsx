const SettingsTab = () => {
  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-6">System Settings</h3>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-3">School Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="School Name"
                className="p-3 border border-gray-300 rounded-lg"
                defaultValue="Demo School"
              />
              <input
                type="text"
                placeholder="School Address"
                className="p-3 border border-gray-300 rounded-lg"
                defaultValue="123 Education Street"
              />
              <input
                type="email"
                placeholder="Contact Email"
                className="p-3 border border-gray-300 rounded-lg"
                defaultValue="admin@demoschool.edu"
              />
              <input
                type="tel"
                placeholder="Contact Phone"
                className="p-3 border border-gray-300 rounded-lg"
                defaultValue="+1 234 567 8900"
              />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">System Preferences</h4>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded" defaultChecked />
                <span>Enable email notifications</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded" defaultChecked />
                <span>Auto-backup data daily</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded" />
                <span>Allow parent portal access</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsTab;
