import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  CreditCard, 
  Clock, 
  UserPlus, 
  BarChart3, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  MoreVertical,
  TrendingUp,
  TrendingDown,
  Calendar,
  Plus,
  Check,
  X,
  FileText,
  DollarSign
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Link, useSearchParams } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { useAuth } from '../App';
import { db, logout, handleFirestoreError, OperationType } from '../lib/firebase';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  doc, 
  query, 
  where, 
  Timestamp, 
  getDocs,
  deleteDoc
} from 'firebase/firestore';

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [employees, setEmployees] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<any[]>([]);
  const [payroll, setPayroll] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showLeaveRequest, setShowLeaveRequest] = useState(false);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['overview', 'employees', 'attendance', 'leave', 'payroll'].includes(tab)) {
      setActiveTab(tab);
    }
    if (searchParams.get('action') === 'checkin') {
      setShowCheckIn(true);
    }
  }, [searchParams]);

  useEffect(() => {
    const unsubEmployees = onSnapshot(collection(db, 'employees'), (snapshot) => {
      setEmployees(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'employees'));

    const unsubAttendance = onSnapshot(collection(db, 'attendance'), (snapshot) => {
      setAttendance(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'attendance'));

    const unsubLeave = onSnapshot(collection(db, 'leaveRequests'), (snapshot) => {
      setLeaveRequests(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'leaveRequests'));

    const unsubPayroll = onSnapshot(collection(db, 'payroll'), (snapshot) => {
      setPayroll(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'payroll'));

    return () => {
      unsubEmployees();
      unsubAttendance();
      unsubLeave();
      unsubPayroll();
    };
  }, []);

  const stats = [
    { label: "Total Employees", value: employees.length.toString(), trend: "+12%", up: true, icon: <Users className="text-blue-600" /> },
    { label: "Monthly Payroll", value: `$${employees.reduce((acc, emp) => acc + (emp.salary || 0), 0).toLocaleString()}`, trend: "+8%", up: true, icon: <CreditCard className="text-green-600" /> },
    { label: "Leave Requests", value: leaveRequests.filter(r => r.status === 'pending').length.toString(), trend: "Pending", up: true, icon: <FileText className="text-orange-600" /> },
    { label: "Today's Attendance", value: attendance.filter(a => a.date === new Date().toISOString().split('T')[0]).length.toString(), trend: "Present", up: true, icon: <Clock className="text-purple-600" /> },
  ];

  const chartData = [
    { name: 'Jan', employees: 40, payroll: 2400 },
    { name: 'Feb', employees: 45, payroll: 2800 },
    { name: 'Mar', employees: 52, payroll: 3200 },
    { name: 'Apr', employees: 60, payroll: 3800 },
    { name: 'May', employees: 65, payroll: 4100 },
    { name: 'Jun', employees: employees.length, payroll: employees.reduce((acc, emp) => acc + (emp.salary || 0), 0) / 10 },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col">
        <div className="p-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <Users className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-slate-900">HRFlow</span>
        </div>
        
        <nav className="flex-grow px-4 space-y-1 mt-4">
          {[
            { id: 'overview', icon: <BarChart3 className="w-5 h-5" />, label: "Overview", adminOnly: true },
            { id: 'employees', icon: <Users className="w-5 h-5" />, label: "Employees", adminOnly: true },
            { id: 'attendance', icon: <Clock className="w-5 h-5" />, label: "Attendance", adminOnly: false },
            { id: 'leave', icon: <FileText className="w-5 h-5" />, label: "Leave Requests", adminOnly: false },
            { id: 'payroll', icon: <CreditCard className="w-5 h-5" />, label: "Payroll", adminOnly: true },
          ].filter(item => !item.adminOnly || isAdmin).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                activeTab === item.id ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Settings className="w-5 h-5" />
            Settings
          </button>
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-lg w-96">
            <Search className="w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900">{user?.displayName || 'User'}</p>
                <p className="text-xs text-slate-500">{isAdmin ? 'Administrator' : 'Employee'}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold overflow-hidden">
                {user?.photoURL ? <img src={user.photoURL} alt="Avatar" /> : user?.displayName?.charAt(0) || 'U'}
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
                    <p className="text-sm text-slate-500">Real-time insights into your workforce.</p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setShowCheckIn(true)}>
                      <Clock className="w-4 h-4 mr-2" />
                      Mark Attendance
                    </Button>
                    {isAdmin && (
                      <Button onClick={() => setShowAddEmployee(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Employee
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {stats.map((stat, idx) => (
                    <Card key={idx}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="p-2 bg-slate-50 rounded-lg">{stat.icon}</div>
                          <div className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                            {stat.trend}
                          </div>
                        </div>
                        <p className="text-sm text-slate-500 mb-1">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <Card>
                    <CardHeader><CardTitle>Growth Trends</CardTitle></CardHeader>
                    <CardContent>
                      <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Area type="monotone" dataKey="employees" stroke="#2563eb" fill="#dbeafe" strokeWidth={2} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {attendance.slice(0, 5).map((a, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-bold">
                                {a.employeeId.slice(-2)}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-slate-900">Employee {a.employeeId}</p>
                                <p className="text-xs text-slate-500">Checked in at {new Date(a.checkInTime).toLocaleTimeString()}</p>
                              </div>
                            </div>
                            <span className="text-[10px] font-bold uppercase text-green-600 bg-green-50 px-2 py-1 rounded-full">Present</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}

            {activeTab === 'employees' && (
              <motion.div key="employees" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-2xl font-bold text-slate-900">Employee Directory</h1>
                  <Button onClick={() => setShowAddEmployee(true)}><Plus className="w-4 h-4 mr-2" /> Add Employee</Button>
                </div>
                <Card>
                  <CardContent className="p-0">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-6 py-4 text-sm font-semibold text-slate-900">ID</th>
                          <th className="px-6 py-4 text-sm font-semibold text-slate-900">Name</th>
                          <th className="px-6 py-4 text-sm font-semibold text-slate-900">Role</th>
                          <th className="px-6 py-4 text-sm font-semibold text-slate-900">Salary</th>
                          <th className="px-6 py-4 text-sm font-semibold text-slate-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {employees.map((emp) => (
                          <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 text-sm font-medium text-blue-600">{emp.id}</td>
                            <td className="px-6 py-4 text-sm text-slate-900">{emp.name}</td>
                            <td className="px-6 py-4 text-sm text-slate-600">{emp.role}</td>
                            <td className="px-6 py-4 text-sm text-slate-900">${emp.salary?.toLocaleString()}</td>
                            <td className="px-6 py-4">
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => deleteDoc(doc(db, 'employees', emp.id))}>
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === 'leave' && (
              <motion.div key="leave" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-2xl font-bold text-slate-900">Leave Requests</h1>
                  <Button onClick={() => setShowLeaveRequest(true)}><Plus className="w-4 h-4 mr-2" /> Request Leave</Button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {leaveRequests.map((req) => (
                    <Card key={req.id}>
                      <CardContent className="p-6 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-bold text-slate-900">Employee {req.employeeId}</span>
                            <span className={cn(
                              "text-[10px] font-bold uppercase px-2 py-1 rounded-full",
                              req.status === 'pending' ? "bg-orange-50 text-orange-600" :
                              req.status === 'approved' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                            )}>
                              {req.status}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 mb-2">{req.reason}</p>
                          <p className="text-xs text-slate-500">
                            {new Date(req.startDate).toLocaleDateString()} - {new Date(req.endDate).toLocaleDateString()}
                          </p>
                        </div>
                        {isAdmin && req.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => updateDoc(doc(db, 'leaveRequests', req.id), { status: 'approved' })}>
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => updateDoc(doc(db, 'leaveRequests', req.id), { status: 'denied' })}>
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'attendance' && (
              <motion.div key="attendance" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-2xl font-bold text-slate-900">Attendance Log</h1>
                  <Button onClick={() => setShowCheckIn(true)}><Clock className="w-4 h-4 mr-2" /> Check In</Button>
                </div>
                <Card>
                  <CardContent className="p-0">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-6 py-4 text-sm font-semibold text-slate-900">Employee ID</th>
                          <th className="px-6 py-4 text-sm font-semibold text-slate-900">Date</th>
                          <th className="px-6 py-4 text-sm font-semibold text-slate-900">Time</th>
                          <th className="px-6 py-4 text-sm font-semibold text-slate-900">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {attendance.sort((a, b) => b.checkInTime.localeCompare(a.checkInTime)).map((a) => (
                          <tr key={a.id}>
                            <td className="px-6 py-4 text-sm font-medium text-slate-900">{a.employeeId}</td>
                            <td className="px-6 py-4 text-sm text-slate-600">{a.date}</td>
                            <td className="px-6 py-4 text-sm text-slate-600">{new Date(a.checkInTime).toLocaleTimeString()}</td>
                            <td className="px-6 py-4">
                              <span className="text-[10px] font-bold uppercase text-green-600 bg-green-50 px-2 py-1 rounded-full">{a.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === 'payroll' && (
              <motion.div key="payroll" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-2xl font-bold text-slate-900">Payroll Management</h1>
                  <Button onClick={() => {}}><DollarSign className="w-4 h-4 mr-2" /> Process Monthly Payroll</Button>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {employees.map(emp => (
                    <Card key={emp.id}>
                      <CardContent className="p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                            <DollarSign className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900">{emp.name}</h4>
                            <p className="text-sm text-slate-500">{emp.role} • {emp.department}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-slate-900">${emp.salary?.toLocaleString()}</p>
                          <p className="text-xs text-slate-500">Monthly Base Salary</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Modals */}
      <Modal show={showAddEmployee} onClose={() => setShowAddEmployee(false)} title="Add New Employee">
        <AddEmployeeForm onClose={() => setShowAddEmployee(false)} />
      </Modal>

      <Modal show={showCheckIn} onClose={() => setShowCheckIn(false)} title="Employee Check-In">
        <CheckInForm onClose={() => setShowCheckIn(false)} />
      </Modal>

      <Modal show={showLeaveRequest} onClose={() => setShowLeaveRequest(false)} title="Submit Leave Request">
        <LeaveRequestForm onClose={() => setShowLeaveRequest(false)} />
      </Modal>
    </div>
  );
};

// Sub-components
const Modal = ({ show, onClose, title, children }: any) => (
  <AnimatePresence>
    {show && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" 
          onClick={onClose} 
        />
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        >
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">{title}</h3>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X /></button>
          </div>
          <div className="p-6">{children}</div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const AddEmployeeForm = ({ onClose }: any) => {
  const [formData, setFormData] = useState({ id: '', name: '', email: '', department: '', role: '', salary: 0 });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'employees'), { ...formData, joinedDate: new Date().toISOString() });
      onClose();
    } catch (err) { handleFirestoreError(err, OperationType.CREATE, 'employees'); }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input required placeholder="Employee ID (e.g. EMP001)" className="w-full p-2 border rounded" onChange={e => setFormData({...formData, id: e.target.value})} />
      <input required placeholder="Full Name" className="w-full p-2 border rounded" onChange={e => setFormData({...formData, name: e.target.value})} />
      <input required type="email" placeholder="Email" className="w-full p-2 border rounded" onChange={e => setFormData({...formData, email: e.target.value})} />
      <input required placeholder="Department" className="w-full p-2 border rounded" onChange={e => setFormData({...formData, department: e.target.value})} />
      <input required placeholder="Role" className="w-full p-2 border rounded" onChange={e => setFormData({...formData, role: e.target.value})} />
      <input required type="number" placeholder="Salary" className="w-full p-2 border rounded" onChange={e => setFormData({...formData, salary: Number(e.target.value)})} />
      <Button type="submit" className="w-full">Add Employee</Button>
    </form>
  );
};

const CheckInForm = ({ onClose }: any) => {
  const [empId, setEmpId] = useState('');
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'attendance'), {
        employeeId: empId,
        date: new Date().toISOString().split('T')[0],
        checkInTime: new Date().toISOString(),
        status: 'present'
      });
      alert('Check-in successful!');
      onClose();
    } catch (err) { handleFirestoreError(err, OperationType.CREATE, 'attendance'); }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm text-slate-500 mb-4">Enter your Employee ID to mark your attendance for today.</p>
      <input required placeholder="Employee ID" className="w-full p-2 border rounded text-center text-2xl font-bold tracking-widest" onChange={e => setEmpId(e.target.value)} />
      <Button type="submit" className="w-full" size="lg">Mark Present</Button>
    </form>
  );
};

const LeaveRequestForm = ({ onClose }: any) => {
  const [formData, setFormData] = useState({ employeeId: '', startDate: '', endDate: '', reason: '' });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'leaveRequests'), {
        ...formData,
        status: 'pending',
        submittedAt: new Date().toISOString()
      });
      alert('Request submitted!');
      onClose();
    } catch (err) { handleFirestoreError(err, OperationType.CREATE, 'leaveRequests'); }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input required placeholder="Employee ID" className="w-full p-2 border rounded" onChange={e => setFormData({...formData, employeeId: e.target.value})} />
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500">Start Date</label>
          <input required type="date" className="w-full p-2 border rounded" onChange={e => setFormData({...formData, startDate: e.target.value})} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500">End Date</label>
          <input required type="date" className="w-full p-2 border rounded" onChange={e => setFormData({...formData, endDate: e.target.value})} />
        </div>
      </div>
      <textarea required placeholder="Reason for leave" className="w-full p-2 border rounded h-24" onChange={e => setFormData({...formData, reason: e.target.value})} />
      <Button type="submit" className="w-full">Submit Request</Button>
    </form>
  );
};

export default Dashboard;
