import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  FileText,
  FileEdit,
  Award,
  LogOut,
  Plus,
  Search,
  Download,
  Upload,
  Edit,
  Trash2,
  Ban,
  ChevronRight,
  HelpCircle,
  MoreHorizontal,
  Globe,
  X,
  CheckCircle,
  Info,
  AlertTriangle,
  BarChart2
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// --- Custom Toast & Confirm (Iframe Safe) ---

type ToastType = 'success' | 'info' | 'error';
let toastListener: ((msg: string, type: ToastType) => void) | null = null;
const showToast = (msg: string, type: ToastType = 'info') => {
  if (toastListener) toastListener(msg, type);
};

let confirmListener: ((msg: string, onConfirm: () => void) => void) | null = null;
const showConfirm = (msg: string, onConfirm: () => void) => {
  if (confirmListener) confirmListener(msg, onConfirm);
};

function GlobalOverlays() {
  const [toast, setToast] = useState<{ msg: string, type: ToastType, id: number } | null>(null);
  const [confirm, setConfirm] = useState<{ msg: string, onConfirm: () => void } | null>(null);

  useEffect(() => {
    toastListener = (msg, type) => {
      setToast({ msg, type, id: Date.now() });
      setTimeout(() => setToast(null), 3000);
    };
    confirmListener = (msg, onConfirm) => {
      setConfirm({ msg, onConfirm });
    };
    return () => {
      toastListener = null;
      confirmListener = null;
    };
  }, []);

  return (
    <>
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-4">
          <div className={`flex items-center p-4 rounded-lg shadow-lg border ${
            toast.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
            toast.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
            'bg-blue-50 border-blue-200 text-blue-800'
          }`}>
            {toast.type === 'success' && <CheckCircle className="w-5 h-5 mr-2 text-green-500" />}
            {toast.type === 'error' && <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />}
            {toast.type === 'info' && <Info className="w-5 h-5 mr-2 text-blue-500" />}
            <span className="font-medium text-sm">{toast.msg}</span>
            <button onClick={() => setToast(null)} className="ml-4 text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-in fade-in">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full mx-4 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-center text-gray-900 mb-2">确认操作</h3>
              <p className="text-sm text-center text-gray-500">{confirm.msg}</p>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
              <button
                onClick={() => setConfirm(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={() => {
                  confirm.onConfirm();
                  setConfirm(null);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// --- Mock Data ---

let initialTeachers = [
  { id: 'T001', name: '张建国', school: '深圳致学商科教育咨询有限公司', account: 'zhangjg', phone: '13800138001', role: '管理员', date: '2023-09-01' },
  { id: 'T002', name: '李晓华', school: '深圳致学商科教育咨询有限公司', account: 'lixh', phone: '13800138002', role: '教师', date: '2023-09-02' },
  { id: 'T003', name: '王伟', school: '深圳致学商科教育咨询有限公司', account: 'wangw', phone: '13800138003', role: '教师', date: '2023-09-03' },
];

let initialStudents = [
  { id: 'S2023001', name: '陈明', school: '深圳致学商科教育咨询有限公司', className: '电商一班', major: '电子商务', account: 'chenming', phone: '13900139001', date: '2023-09-01' },
  { id: 'S2023002', name: '林悦', school: '深圳致学商科教育咨询有限公司', className: '电商一班', major: '电子商务', account: 'linyue', phone: '13900139002', date: '2023-09-01' },
  { id: 'S2023003', name: '赵强', school: '深圳致学商科教育咨询有限公司', className: '计算机二班', major: '计算机科学', account: 'zhaoqiang', phone: '13900139003', date: '2023-09-02' },
];

let initialClasses = [
  { id: 'C001', name: '电商一班', type: '电商班', studentCount: 45, teacher: '李晓华', date: '2023-09-01' },
  { id: 'C002', name: '计算机二班', type: '计算机班', studentCount: 50, teacher: '王伟', date: '2023-09-02' },
];

let initialTrainings = [
  { id: 'TR001', name: '双十一电商大促实训', type: '电商运营', className: '电商一班', studentCount: 45, status: '进行中', date: '2023-10-01' },
  { id: 'TR002', name: '前端开发基础实训', type: '编程实训', className: '计算机二班', studentCount: 50, status: '未开始', date: '2023-10-15' },
];

let initialCourses = [
  { id: 'CR001', name: '电商平台规则解析', type: '理论课', className: '电商一班', teacher: '李晓华', time: '2023-10-15 09:00', location: '教学楼A栋101', status: '已安排' },
  { id: 'CR002', name: 'HTML/CSS基础', type: '实训课', className: '计算机二班', teacher: '王伟', time: '2023-10-16 14:00', location: '机房B栋202', status: '已安排' },
];

let initialAssignments = [
  { id: 'A001', title: '店铺装修方案设计', course: '双十一电商大促实训', teacher: '李晓华', deadline: '2023-10-20 23:59', status: '已批改' },
  { id: 'A002', title: '个人主页切图练习', course: '前端开发基础实训', teacher: '王伟', deadline: '2023-10-25 23:59', status: '未提交' },
];

let initialAnnouncements = [
  { id: 'AN001', title: '关于2023秋季实训周安排的通知', author: '教务处', date: '2023-10-10', type: '重要通知', status: '已发布' },
  { id: 'AN002', title: '双十一电商大促实训动员大会', author: '李晓华', date: '2023-10-12', type: '实训活动', status: '已发布' },
];

let initialExams = [
  { id: 'E001', name: '电商运营期中考试', type: '期中', className: '电商一班', time: '2023-11-01 14:00', teacher: '李晓华', status: '未开始' },
  { id: 'E002', name: '前端基础随堂测', type: '随堂测', className: '计算机二班', time: '2023-10-20 16:00', teacher: '王伟', status: '已结束' },
];

let initialGrades = [
  { id: 'G001', studentName: '陈明', studentId: 'S2023001', course: '双十一电商大促实训', trainingGrade: 85, examGrade: 90, totalGrade: 88, rank: 5 },
  { id: 'G002', studentName: '林悦', studentId: 'S2023002', course: '双十一电商大促实训', trainingGrade: 92, examGrade: 88, totalGrade: 90, rank: 2 },
  { id: 'G003', studentName: '赵强', studentId: 'S2023003', course: '前端开发基础实训', trainingGrade: 78, examGrade: 82, totalGrade: 80, rank: 15 },
];

let initialDomains = [
  { id: 'D001', domain: 'edu.zhiyue.com', school: '深圳致学商科教育咨询有限公司', status: '已生效', date: '2023-09-01' },
  { id: 'D002', domain: 'test.zhiyue.com', school: '深圳致学商科教育咨询有限公司', status: '已生效', date: '2023-09-05' },
];

// --- Shared Components ---

function ActionButton({ icon: Icon, label, onClick, variant = 'primary' }: { icon: any, label: string, onClick?: () => void, variant?: 'primary' | 'secondary' | 'danger' }) {
  const baseClasses = "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };
  
  return (
    <button className={`${baseClasses} ${variants[variant]}`} onClick={onClick}>
      <Icon size={16} className="mr-2" />
      {label}
    </button>
  );
}

function Table({ columns, data, actions }: { columns: any[], data: any[], actions?: (row: any) => React.ReactNode }) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col, i) => (
              <th key={i} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {col.header}
              </th>
            ))}
            {actions && (
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50">
              {columns.map((col, j) => (
                <td key={j} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {col.render ? col.render(row) : row[col.accessor]}
                </td>
              ))}
              {actions && (
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {actions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  let color = 'bg-gray-100 text-gray-800';
  if (status === '进行中' || status === '已提交') color = 'bg-blue-100 text-blue-800';
  if (status === '已完成' || status === '已批改' || status === '已结束' || status === '已安排') color = 'bg-green-100 text-green-800';
  if (status === '未开始' || status === '未提交' || status === '未安排') color = 'bg-yellow-100 text-yellow-800';
  
  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${color}`}>
      {status}
    </span>
  );
}

function Modal({ title, isOpen, onClose, children, onSubmit }: { title: string, isOpen: boolean, onClose: () => void, children: React.ReactNode, onSubmit: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-in fade-in">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center shrink-0">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
        <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3 border-t border-gray-200 shrink-0">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            取消
          </button>
          <button onClick={onSubmit} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700">
            确定
          </button>
        </div>
      </div>
    </div>
  );
}

function SearchBar({ placeholder, value, onChange }: { placeholder: string, value: string, onChange: (val: string) => void }) {
  return (
    <div className="relative rounded-md shadow-sm max-w-sm w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
        placeholder={placeholder}
      />
    </div>
  );
}

// --- Views ---

function DomainManagement() {
  const [domains, setDomains] = useState(initialDomains);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({ domain: '', school: '' });

  const filteredDomains = domains.filter(d => d.domain.includes(searchTerm));

  const handleDelete = (id: string) => {
    showConfirm('确定要解绑该域名吗？', () => {
      setDomains(domains.filter(d => d.id !== id));
      showToast('域名已解绑', 'success');
    });
  };

  const handleAdd = () => {
    if (!formData.domain || !formData.school) {
      showToast('请填写完整信息', 'error');
      return;
    }
    const newDomain = {
      id: `D00${domains.length + 1}`,
      domain: formData.domain,
      school: formData.school,
      status: '已生效',
      date: new Date().toISOString().split('T')[0]
    };
    setDomains([...domains, newDomain]);
    setIsAddModalOpen(false);
    setFormData({ domain: '', school: '' });
    showToast('域名绑定成功', 'success');
  };

  const columns = [
    { header: '域名', accessor: 'domain' },
    { header: '绑定机构', accessor: 'school' },
    { header: '状态', render: (row: any) => <StatusBadge status={row.status} /> },
    { header: '绑定时间', accessor: 'date' },
  ];

  const renderActions = (row: any) => (
    <div className="flex justify-end space-x-2">
      <button className="text-indigo-600 hover:text-indigo-900" title="修改"><Edit size={18} /></button>
      <button onClick={() => handleDelete(row.id)} className="text-red-600 hover:text-red-900" title="解绑"><Trash2 size={18} /></button>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <SearchBar placeholder="搜索域名" value={searchTerm} onChange={setSearchTerm} />
        <div className="flex space-x-3">
          <ActionButton icon={Plus} label="绑定新域名" onClick={() => setIsAddModalOpen(true)} />
        </div>
      </div>
      <Table columns={columns} data={filteredDomains} actions={renderActions} />
      
      <Modal title="绑定新域名" isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSubmit={handleAdd}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">域名</label>
            <input type="text" value={formData.domain} onChange={e => setFormData({...formData, domain: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="例如: edu.example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">绑定机构</label>
            <input type="text" value={formData.school} onChange={e => setFormData({...formData, school: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="输入机构名称" />
          </div>
        </div>
      </Modal>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900">欢迎使用金隅实训系统</h2>
        <p className="text-gray-500 mt-1">当前登录机构：深圳致学商科教育咨询有限公司</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center">
          <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 mr-4">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">历史完成实训</p>
            <p className="text-2xl font-semibold text-gray-900">128</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center">
          <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">当前域名绑定个数</p>
            <p className="text-2xl font-semibold text-gray-900">3</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">进行中实训</p>
            <p className="text-2xl font-semibold text-gray-900">12</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">教师端使用流程</h3>
        <div className="flex items-center justify-between max-w-4xl mx-auto py-8">
          {['添加学生', '添加教师', '添加班级', '添加实训', '课程/考试计划', '完成实训'].map((step, index, arr) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center text-indigo-600 font-bold mb-2">
                  {index + 1}
                </div>
                <span className="text-sm font-medium text-gray-700">{step}</span>
              </div>
              {index < arr.length - 1 && (
                <div className="flex-1 h-0.5 bg-gray-200 mx-4 relative">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 text-gray-300">
                    <ChevronRight size={20} />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 flex items-start">
        <HelpCircle className="text-indigo-500 mt-0.5 mr-3 flex-shrink-0" size={20} />
        <div>
          <h4 className="text-sm font-medium text-indigo-800">需要帮助？</h4>
          <p className="text-sm text-indigo-700 mt-1">查看帮助中心获取详细的操作手册和视频教程。</p>
          <button className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center">
            <Download size={16} className="mr-1" />
            下载操作手册
          </button>
        </div>
      </div>
    </div>
  );
}

function TeacherManagement() {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', school: '', account: '', phone: '', role: '教师' });

  const filteredTeachers = teachers.filter(t => 
    t.name.includes(searchTerm) || t.account.includes(searchTerm) || t.phone.includes(searchTerm)
  );

  const handleDelete = (id: string) => {
    showConfirm('确定要移除该教师吗？', () => {
      setTeachers(teachers.filter(t => t.id !== id));
      showToast('教师已移除', 'success');
    });
  };

  const handleAdd = () => {
    if (!formData.name || !formData.account || !formData.phone || !formData.school) {
      showToast('请填写完整信息', 'error');
      return;
    }
    const newTeacher = {
      id: `T00${teachers.length + 1}`,
      ...formData,
      date: new Date().toISOString().split('T')[0]
    };
    setTeachers([...teachers, newTeacher]);
    setIsAddModalOpen(false);
    setFormData({ name: '', school: '', account: '', phone: '', role: '教师' });
    showToast('教师添加成功', 'success');
  };

  const columns = [
    { header: '教职工编号', accessor: 'id' },
    { header: '姓名', accessor: 'name' },
    { header: '院校名称', accessor: 'school' },
    { header: '账号', accessor: 'account' },
    { header: '手机号码', accessor: 'phone' },
    { header: '角色权限', accessor: 'role' },
    { header: '创建日期', accessor: 'date' },
  ];

  const renderActions = (row: any) => (
    <div className="flex justify-end space-x-2">
      <button className="text-indigo-600 hover:text-indigo-900" title="修改"><Edit size={18} /></button>
      <button className="text-yellow-600 hover:text-yellow-900" title="禁用"><Ban size={18} /></button>
      <button onClick={() => handleDelete(row.id)} className="text-red-600 hover:text-red-900" title="移除"><Trash2 size={18} /></button>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <SearchBar placeholder="搜索教师姓名/账号/手机号" value={searchTerm} onChange={setSearchTerm} />
        <div className="flex space-x-3">
          <ActionButton icon={Upload} label="批量导入" variant="secondary" onClick={() => showToast('打开批量导入弹窗')} />
          <ActionButton icon={Plus} label="添加账号" onClick={() => setIsAddModalOpen(true)} />
        </div>
      </div>
      <Table columns={columns} data={filteredTeachers} actions={renderActions} />
      
      <Modal title="添加教师" isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSubmit={handleAdd}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="输入教师姓名" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">院校名称</label>
            <input type="text" value={formData.school} onChange={e => setFormData({...formData, school: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="输入院校名称" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">账号</label>
            <input type="text" value={formData.account} onChange={e => setFormData({...formData, account: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="输入登录账号" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">手机号码</label>
            <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="输入手机号码" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">角色权限</label>
            <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500">
              <option value="教师">教师</option>
              <option value="管理员">管理员</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function StudentManagement() {
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('所有班级');
  const [majorFilter, setMajorFilter] = useState('所有专业');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', school: '', className: '电商一班', major: '电子商务', account: '', phone: '' });

  const filteredStudents = students.filter(s => {
    const matchSearch = s.name.includes(searchTerm) || s.id.includes(searchTerm);
    const matchClass = classFilter === '所有班级' || s.className === classFilter;
    const matchMajor = majorFilter === '所有专业' || s.major === majorFilter;
    return matchSearch && matchClass && matchMajor;
  });

  const handleDelete = (id: string) => {
    showConfirm('确定要移除该学生吗？', () => {
      setStudents(students.filter(s => s.id !== id));
      showToast('学生已移除', 'success');
    });
  };

  const handleAdd = () => {
    if (!formData.name || !formData.account || !formData.phone || !formData.school) {
      showToast('请填写完整信息', 'error');
      return;
    }
    const newStudent = {
      id: `S202300${students.length + 1}`,
      ...formData,
      date: new Date().toISOString().split('T')[0]
    };
    setStudents([...students, newStudent]);
    setIsAddModalOpen(false);
    setFormData({ name: '', school: '', className: '电商一班', major: '电子商务', account: '', phone: '' });
    showToast('学生添加成功', 'success');
  };

  const columns = [
    { header: '学生学号', accessor: 'id' },
    { header: '姓名', accessor: 'name' },
    { header: '所属院校', accessor: 'school' },
    { header: '班级', accessor: 'className' },
    { header: '专业', accessor: 'major' },
    { header: '账号', accessor: 'account' },
    { header: '手机号码', accessor: 'phone' },
    { header: '创建日期', accessor: 'date' },
  ];

  const renderActions = (row: any) => (
    <div className="flex justify-end space-x-2">
      <button className="text-indigo-600 hover:text-indigo-900" title="修改"><Edit size={18} /></button>
      <button className="text-yellow-600 hover:text-yellow-900" title="禁用"><Ban size={18} /></button>
      <button onClick={() => handleDelete(row.id)} className="text-red-600 hover:text-red-900" title="移除"><Trash2 size={18} /></button>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4 flex-1">
          <SearchBar placeholder="搜索学生姓名/学号" value={searchTerm} onChange={setSearchTerm} />
          <select 
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
          >
            <option>所有班级</option>
            <option>电商一班</option>
            <option>计算机二班</option>
          </select>
          <select 
            value={majorFilter}
            onChange={(e) => setMajorFilter(e.target.value)}
            className="block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
          >
            <option>所有专业</option>
            <option>电子商务</option>
            <option>计算机科学</option>
          </select>
        </div>
        <div className="flex space-x-3">
          <ActionButton icon={Upload} label="批量导入" variant="secondary" onClick={() => showToast('打开批量导入弹窗')} />
          <ActionButton icon={Plus} label="添加账号" onClick={() => setIsAddModalOpen(true)} />
        </div>
      </div>
      <Table columns={columns} data={filteredStudents} actions={renderActions} />
      
      <Modal title="添加学生" isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSubmit={handleAdd}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="输入学生姓名" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">所属院校</label>
            <input type="text" value={formData.school} onChange={e => setFormData({...formData, school: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="输入院校名称" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">班级</label>
              <select value={formData.className} onChange={e => setFormData({...formData, className: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                <option value="电商一班">电商一班</option>
                <option value="计算机二班">计算机二班</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">专业</label>
              <select value={formData.major} onChange={e => setFormData({...formData, major: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                <option value="电子商务">电子商务</option>
                <option value="计算机科学">计算机科学</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">账号</label>
            <input type="text" value={formData.account} onChange={e => setFormData({...formData, account: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="输入登录账号" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">手机号码</label>
            <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="输入手机号码" />
          </div>
        </div>
      </Modal>
    </div>
  );
}

function ClassManagement() {
  const [classes, setClasses] = useState(initialClasses);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', type: '电商班', teacher: '' });

  const filteredClasses = classes.filter(c => c.name.includes(searchTerm));

  const handleDelete = (id: string) => {
    showConfirm('确定要删除该班级吗？', () => {
      setClasses(classes.filter(c => c.id !== id));
      showToast('班级已删除', 'success');
    });
  };

  const handleAdd = () => {
    if (!formData.name || !formData.type || !formData.teacher) {
      showToast('请填写完整信息', 'error');
      return;
    }
    const newClass = {
      id: `C00${classes.length + 1}`,
      ...formData,
      studentCount: 0,
      date: new Date().toISOString().split('T')[0]
    };
    setClasses([...classes, newClass]);
    setIsAddModalOpen(false);
    setFormData({ name: '', type: '电商班', teacher: '' });
    showToast('班级添加成功', 'success');
  };

  const columns = [
    { header: '班级名称', accessor: 'name' },
    { header: '班级类型', accessor: 'type' },
    { header: '学生数量', accessor: 'studentCount' },
    { header: '班主任', accessor: 'teacher' },
    { header: '创建时间', accessor: 'date' },
  ];

  const renderActions = (row: any) => (
    <div className="flex justify-end space-x-2">
      <button className="text-indigo-600 hover:text-indigo-900" title="修改"><Edit size={18} /></button>
      <button onClick={() => handleDelete(row.id)} className="text-red-600 hover:text-red-900" title="删除"><Trash2 size={18} /></button>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <SearchBar placeholder="搜索班级名称" value={searchTerm} onChange={setSearchTerm} />
        <div className="flex space-x-3">
          <ActionButton icon={Users} label="批量导入学生至班级" variant="secondary" onClick={() => showToast('打开导入弹窗')} />
          <ActionButton icon={Plus} label="添加班级" onClick={() => setIsAddModalOpen(true)} />
        </div>
      </div>
      <Table columns={columns} data={filteredClasses} actions={renderActions} />
      
      <Modal title="添加班级" isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSubmit={handleAdd}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">班级名称</label>
            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="例如: 电商一班" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">班级类型</label>
            <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500">
              <option value="电商班">电商班</option>
              <option value="计算机班">计算机班</option>
              <option value="设计班">设计班</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">班主任</label>
            <input type="text" value={formData.teacher} onChange={e => setFormData({...formData, teacher: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="输入教师姓名" />
          </div>
        </div>
      </Modal>
    </div>
  );
}

function TrainingManagement() {
  const [trainings, setTrainings] = useState(initialTrainings);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', type: '电商运营', className: '' });

  const filteredTrainings = trainings.filter(t => t.name.includes(searchTerm));

  const handleDelete = (id: string) => {
    showConfirm('确定要删除该实训吗？', () => {
      setTrainings(trainings.filter(t => t.id !== id));
      showToast('实训已删除', 'success');
    });
  };

  const handleAdd = () => {
    if (!formData.name || !formData.type || !formData.className) {
      showToast('请填写完整信息', 'error');
      return;
    }
    const newTraining = {
      id: `TR00${trainings.length + 1}`,
      ...formData,
      studentCount: 0,
      status: '未开始',
      date: new Date().toISOString().split('T')[0]
    };
    setTrainings([...trainings, newTraining]);
    setIsAddModalOpen(false);
    setFormData({ name: '', type: '电商运营', className: '' });
    showToast('实训添加成功', 'success');
  };

  const columns = [
    { header: '实训名称', accessor: 'name' },
    { header: '实训类型', accessor: 'type' },
    { header: '关联班级', accessor: 'className' },
    { header: '学生数量', accessor: 'studentCount' },
    { header: '状态', render: (row: any) => <StatusBadge status={row.status} /> },
    { header: '创建时间', accessor: 'date' },
  ];

  const renderActions = (row: any) => (
    <div className="flex justify-end space-x-2">
      <button onClick={() => showToast(`查看实训 ${row.name} 进度`)} className="text-blue-600 hover:text-blue-900 text-sm font-medium mr-2">查看进度</button>
      <button className="text-indigo-600 hover:text-indigo-900" title="修改"><Edit size={18} /></button>
      <button onClick={() => handleDelete(row.id)} className="text-red-600 hover:text-red-900" title="删除"><Trash2 size={18} /></button>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <SearchBar placeholder="搜索实训名称" value={searchTerm} onChange={setSearchTerm} />
        <ActionButton icon={Plus} label="添加实训" onClick={() => setIsAddModalOpen(true)} />
      </div>
      <Table columns={columns} data={filteredTrainings} actions={renderActions} />
      
      <Modal title="添加实训" isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSubmit={handleAdd}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">实训名称</label>
            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="例如: 双十一电商大促实训" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">实训类型</label>
            <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500">
              <option value="电商运营">电商运营</option>
              <option value="编程实训">编程实训</option>
              <option value="设计实训">设计实训</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">关联班级</label>
            <input type="text" value={formData.className} onChange={e => setFormData({...formData, className: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="输入班级名称" />
          </div>
        </div>
      </Modal>
    </div>
  );
}

function CourseSchedule() {
  const [courses, setCourses] = useState(initialCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('所有类型');
  const [teacherFilter, setTeacherFilter] = useState('所有教师');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', type: '理论课', className: '', teacher: '', time: '', location: '' });
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const filteredCourses = courses.filter(c => {
    const matchSearch = c.name.includes(searchTerm);
    const matchType = typeFilter === '所有类型' || c.type === typeFilter;
    const matchTeacher = teacherFilter === '所有教师' || c.teacher === teacherFilter;
    return matchSearch && matchType && matchTeacher;
  });

  const handleDelete = (id: string) => {
    showConfirm('确定要删除该课程吗？', () => {
      setCourses(courses.filter(c => c.id !== id));
      showToast('课程已删除', 'success');
    });
  };

  const handleAdd = () => {
    if (!formData.name || !formData.className || !formData.teacher || !formData.time) {
      showToast('请填写完整信息', 'error');
      return;
    }
    const newCourse = {
      id: `CR00${courses.length + 1}`,
      ...formData,
      status: '已安排'
    };
    setCourses([...courses, newCourse]);
    setIsAddModalOpen(false);
    setFormData({ name: '', type: '理论课', className: '', teacher: '', time: '', location: '' });
    showToast('课程添加成功', 'success');
  };

  const columns = [
    { header: '课程名称', accessor: 'name' },
    { header: '类型', accessor: 'type' },
    { header: '班级', accessor: 'className' },
    { header: '教师', accessor: 'teacher' },
    { header: '时间', accessor: 'time' },
    { header: '地点', accessor: 'location' },
    { header: '状态', render: (row: any) => <StatusBadge status={row.status} /> },
  ];

  const renderActions = (row: any) => (
    <div className="flex justify-end space-x-2">
      <button className="text-indigo-600 hover:text-indigo-900" title="修改"><Edit size={18} /></button>
      <button onClick={() => handleDelete(row.id)} className="text-red-600 hover:text-red-900" title="删除"><Trash2 size={18} /></button>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4 flex-1">
          <SearchBar placeholder="搜索课程名称" value={searchTerm} onChange={setSearchTerm} />
          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
          >
            <option>所有类型</option>
            <option>理论课</option>
            <option>实训课</option>
          </select>
          <select 
            value={teacherFilter}
            onChange={(e) => setTeacherFilter(e.target.value)}
            className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
          >
            <option>所有教师</option>
            <option>李晓华</option>
            <option>王伟</option>
          </select>
        </div>
        <div className="flex space-x-3">
          <ActionButton icon={Calendar} label="日历视图" variant="secondary" onClick={() => showToast('切换到日历视图')} />
          <ActionButton icon={Plus} label="添加课程" onClick={() => setIsAddModalOpen(true)} />
        </div>
      </div>
      <Table columns={columns} data={filteredCourses} actions={renderActions} />
      
      <Modal title="添加课程" isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSubmit={handleAdd}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">课程名称</label>
            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="例如: HTML/CSS基础" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">课程类型</label>
              <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                <option value="理论课">理论课</option>
                <option value="实训课">实训课</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">班级</label>
              <input type="text" value={formData.className} onChange={e => setFormData({...formData, className: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="输入班级名称" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">授课教师</label>
            <input type="text" value={formData.teacher} onChange={e => setFormData({...formData, teacher: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="输入教师姓名" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">时间</label>
              <input type="text" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="例如: 2023-10-15 09:00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">地点</label>
              <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="例如: 教学楼A栋101" />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function AnnouncementManagement() {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', author: '', type: '重要通知', content: '' });

  const filteredAnnouncements = announcements.filter(a => a.title.includes(searchTerm));

  const handleAdd = () => {
    if (!formData.title || !formData.author) {
      showToast('请填写完整信息', 'error');
      return;
    }
    const newAnnouncement = {
      id: `AN00${announcements.length + 1}`,
      title: formData.title,
      author: formData.author,
      type: formData.type,
      date: new Date().toISOString().split('T')[0],
      status: '已发布'
    };
    setAnnouncements([...announcements, newAnnouncement]);
    setIsAddModalOpen(false);
    setFormData({ title: '', author: '', type: '重要通知', content: '' });
    showToast('公告发布成功', 'success');
  };

  const handleDelete = (id: string) => {
    showConfirm('确定要删除该公告吗？', () => {
      setAnnouncements(announcements.filter(a => a.id !== id));
      showToast('公告已删除', 'success');
    });
  };

  const columns = [
    { header: '公告标题', accessor: 'title' },
    { header: '发布人', accessor: 'author' },
    { header: '类型', accessor: 'type' },
    { header: '发布日期', accessor: 'date' },
    { header: '状态', render: (row: any) => <StatusBadge status={row.status} /> },
  ];

  const renderActions = (row: any) => (
    <div className="flex justify-end space-x-2">
      <button onClick={() => showToast(`查看公告 ${row.title}`)} className="text-blue-600 hover:text-blue-900" title="查看"><FileText size={18} /></button>
      <button className="text-indigo-600 hover:text-indigo-900" title="修改"><Edit size={18} /></button>
      <button onClick={() => handleDelete(row.id)} className="text-red-600 hover:text-red-900" title="删除"><Trash2 size={18} /></button>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <SearchBar placeholder="搜索公告标题" value={searchTerm} onChange={setSearchTerm} />
        <div className="flex space-x-3">
          <ActionButton icon={Plus} label="发布公告" onClick={() => setIsAddModalOpen(true)} />
        </div>
      </div>
      <Table columns={columns} data={filteredAnnouncements} actions={renderActions} />
      
      <Modal title="发布公告" isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSubmit={handleAdd}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">公告标题</label>
            <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="输入公告标题" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">发布人</label>
              <input type="text" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="输入发布人" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">公告类型</label>
              <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                <option value="重要通知">重要通知</option>
                <option value="实训活动">实训活动</option>
                <option value="系统更新">系统更新</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">公告内容</label>
            <textarea value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} rows={4} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="输入公告内容..."></textarea>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function LearningAnalysis() {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(initialCourses[0]?.id || '');

  const selectedCourse = initialCourses.find(c => c.id === selectedCourseId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">选择课程：</label>
          <select 
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="block w-64 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
          >
            {initialCourses.map(course => (
              <option key={course.id} value={course.id}>{course.name} ({course.className})</option>
            ))}
          </select>
        </div>
        <ActionButton icon={Download} label="导出报告" variant="secondary" onClick={() => showToast('导出学情分析报告')} />
      </div>

      {selectedCourse ? (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100 shadow-sm">
              <p className="text-sm text-indigo-600 font-medium">平均出勤率</p>
              <p className="text-3xl font-bold text-indigo-900 mt-2">96.5%</p>
              <p className="text-xs text-indigo-500 mt-2">较上周上升 1.2%</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border border-green-100 shadow-sm">
              <p className="text-sm text-green-600 font-medium">作业完成率</p>
              <p className="text-3xl font-bold text-green-900 mt-2">92.0%</p>
              <p className="text-xs text-green-500 mt-2">较上周上升 0.5%</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 shadow-sm">
              <p className="text-sm text-blue-600 font-medium">平均成绩</p>
              <p className="text-3xl font-bold text-blue-900 mt-2">85.4</p>
              <p className="text-xs text-blue-500 mt-2">年级排名前 15%</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="text-base font-medium text-gray-900 mb-6">成绩分布</h4>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: '90-100', count: 12 },
                    { name: '80-89', count: 25 },
                    { name: '70-79', count: 15 },
                    { name: '60-69', count: 5 },
                    { name: '<60', count: 2 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <RechartsTooltip cursor={{fill: '#f3f4f6'}} />
                    <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h4 className="text-base font-medium text-gray-900 mb-6">知识点掌握情况</h4>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: '优秀', value: 35 },
                        { name: '良好', value: 40 },
                        { name: '一般', value: 15 },
                        { name: '薄弱', value: 10 },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      <Cell fill="#10b981" />
                      <Cell fill="#3b82f6" />
                      <Cell fill="#f59e0b" />
                      <Cell fill="#ef4444" />
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200 shadow-sm">
          <p className="text-gray-500">请选择一门课程以查看学情分析</p>
        </div>
      )}
    </div>
  );
}

function AssignmentManagement() {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', course: '', teacher: '', deadline: '' });

  const filteredAssignments = assignments.filter(a => a.title.includes(searchTerm));

  const handleAdd = () => {
    if (!formData.title || !formData.course || !formData.deadline) {
      showToast('请填写完整信息', 'error');
      return;
    }
    const newAssignment = {
      id: `A00${assignments.length + 1}`,
      ...formData,
      status: '未提交'
    };
    setAssignments([...assignments, newAssignment]);
    setIsAddModalOpen(false);
    setFormData({ title: '', course: '', teacher: '', deadline: '' });
    showToast('作业发布成功', 'success');
  };

  const columns = [
    { header: '作业标题', accessor: 'title' },
    { header: '关联课程/实训', accessor: 'course' },
    { header: '发布教师', accessor: 'teacher' },
    { header: '截止时间', accessor: 'deadline' },
    { header: '状态', render: (row: any) => <StatusBadge status={row.status} /> },
  ];

  const renderActions = (row: any) => (
    <div className="flex justify-end space-x-3">
      <button onClick={() => showToast(`查看作业 ${row.title} 提交情况`)} className="text-blue-600 hover:text-blue-900 text-sm font-medium">查看提交</button>
      <button onClick={() => showToast(`批改作业 ${row.title}`)} className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">批改</button>
      <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={18} /></button>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <SearchBar placeholder="搜索作业标题" value={searchTerm} onChange={setSearchTerm} />
        <div className="flex space-x-3">
          <ActionButton icon={Download} label="导出数据" variant="secondary" onClick={() => showToast('导出作业数据')} />
          <ActionButton icon={Plus} label="发布作业" onClick={() => setIsAddModalOpen(true)} />
        </div>
      </div>
      <Table columns={columns} data={filteredAssignments} actions={renderActions} />
      
      <Modal title="发布作业" isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSubmit={handleAdd}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">作业标题</label>
            <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="输入作业标题" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">关联课程/实训</label>
            <input type="text" value={formData.course} onChange={e => setFormData({...formData, course: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="输入课程名称" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">发布教师</label>
              <input type="text" value={formData.teacher} onChange={e => setFormData({...formData, teacher: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="输入教师姓名" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">截止时间</label>
              <input type="text" value={formData.deadline} onChange={e => setFormData({...formData, deadline: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="例如: 2023-10-20 23:59" />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function ExamManagement() {
  const [exams, setExams] = useState(initialExams);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', type: '期中', className: '', time: '', teacher: '' });

  const filteredExams = exams.filter(e => e.name.includes(searchTerm));

  const handleDelete = (id: string) => {
    showConfirm('确定要删除该考试吗？', () => {
      setExams(exams.filter(e => e.id !== id));
      showToast('考试已删除', 'success');
    });
  };

  const handleAdd = () => {
    if (!formData.name || !formData.className || !formData.time) {
      showToast('请填写完整信息', 'error');
      return;
    }
    const newExam = {
      id: `E00${exams.length + 1}`,
      ...formData,
      status: '未开始'
    };
    setExams([...exams, newExam]);
    setIsAddModalOpen(false);
    setFormData({ name: '', type: '期中', className: '', time: '', teacher: '' });
    showToast('考试添加成功', 'success');
  };

  const columns = [
    { header: '考试名称', accessor: 'name' },
    { header: '类型', accessor: 'type' },
    { header: '班级', accessor: 'className' },
    { header: '时间', accessor: 'time' },
    { header: '监考教师', accessor: 'teacher' },
    { header: '状态', render: (row: any) => <StatusBadge status={row.status} /> },
  ];

  const renderActions = (row: any) => (
    <div className="flex justify-end space-x-3">
      <button onClick={() => showToast(`查看考试 ${row.name} 成绩`)} className="text-blue-600 hover:text-blue-900 text-sm font-medium">查看成绩</button>
      <button className="text-indigo-600 hover:text-indigo-900" title="修改"><Edit size={18} /></button>
      <button onClick={() => handleDelete(row.id)} className="text-red-600 hover:text-red-900" title="删除"><Trash2 size={18} /></button>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <SearchBar placeholder="搜索考试名称" value={searchTerm} onChange={setSearchTerm} />
        <div className="flex space-x-3">
          <ActionButton icon={FileText} label="题库管理" variant="secondary" onClick={() => showToast('打开题库管理')} />
          <ActionButton icon={Plus} label="添加考试" onClick={() => setIsAddModalOpen(true)} />
        </div>
      </div>
      <Table columns={columns} data={filteredExams} actions={renderActions} />
      
      <Modal title="添加考试" isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSubmit={handleAdd}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">考试名称</label>
            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="例如: 电商运营期中考试" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">考试类型</label>
              <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                <option value="期中">期中</option>
                <option value="期末">期末</option>
                <option value="随堂测">随堂测</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">班级</label>
              <input type="text" value={formData.className} onChange={e => setFormData({...formData, className: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="输入班级名称" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">考试时间</label>
              <input type="text" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="例如: 2023-11-01 14:00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">监考教师</label>
              <input type="text" value={formData.teacher} onChange={e => setFormData({...formData, teacher: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="输入教师姓名" />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function GradeManagement() {
  const [grades, setGrades] = useState(initialGrades);
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('所有班级');
  const [courseFilter, setCourseFilter] = useState('所有课程/实训');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({ studentName: '', studentId: '', course: '', trainingGrade: 0, examGrade: 0 });

  const filteredGrades = grades.filter(g => {
    const matchSearch = g.studentName.includes(searchTerm) || g.studentId.includes(searchTerm);
    // In a real app, we'd need to join with student data to filter by class
    const matchCourse = courseFilter === '所有课程/实训' || g.course === courseFilter;
    return matchSearch && matchCourse;
  });

  const handleAdd = () => {
    if (!formData.studentName || !formData.studentId || !formData.course) {
      showToast('请填写完整信息', 'error');
      return;
    }
    const totalGrade = Math.round((Number(formData.trainingGrade) + Number(formData.examGrade)) / 2);
    const newGrade = {
      id: `G00${grades.length + 1}`,
      ...formData,
      totalGrade,
      rank: grades.length + 1
    };
    setGrades([...grades, newGrade]);
    setIsAddModalOpen(false);
    setFormData({ studentName: '', studentId: '', course: '', trainingGrade: 0, examGrade: 0 });
    showToast('成绩录入成功', 'success');
  };

  const columns = [
    { header: '学生姓名', accessor: 'studentName' },
    { header: '学号', accessor: 'studentId' },
    { header: '课程/实训名称', accessor: 'course' },
    { header: '实训成绩', accessor: 'trainingGrade' },
    { header: '考试成绩', accessor: 'examGrade' },
    { header: '总成绩', accessor: 'totalGrade', render: (row: any) => <span className="font-semibold text-indigo-600">{row.totalGrade}</span> },
    { header: '排名', accessor: 'rank' },
  ];

  const renderActions = (row: any) => (
    <div className="flex justify-end space-x-2">
      <button onClick={() => showToast(`修改 ${row.studentName} 的成绩`)} className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">修改成绩</button>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4 flex-1">
          <SearchBar placeholder="搜索学生姓名/学号" value={searchTerm} onChange={setSearchTerm} />
          <select 
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
          >
            <option>所有班级</option>
            <option>电商一班</option>
            <option>计算机二班</option>
          </select>
          <select 
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
          >
            <option>所有课程/实训</option>
            <option>双十一电商大促实训</option>
            <option>前端开发基础实训</option>
          </select>
        </div>
        <div className="flex space-x-3">
          <ActionButton icon={Upload} label="成绩录入" variant="secondary" onClick={() => setIsAddModalOpen(true)} />
          <ActionButton icon={Download} label="导出成绩单" onClick={() => showToast('导出成绩单')} />
        </div>
      </div>
      
      {/* 成绩分析简报 */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-500">平均分</p>
          <p className="text-xl font-semibold text-gray-900 mt-1">85.4</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-500">及格率</p>
          <p className="text-xl font-semibold text-green-600 mt-1">98%</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-500">最高分</p>
          <p className="text-xl font-semibold text-indigo-600 mt-1">98</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-500">最低分</p>
          <p className="text-xl font-semibold text-red-600 mt-1">58</p>
        </div>
      </div>

      <Table columns={columns} data={filteredGrades} actions={renderActions} />
      
      <Modal title="成绩录入" isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSubmit={handleAdd}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">学生姓名</label>
              <input type="text" value={formData.studentName} onChange={e => setFormData({...formData, studentName: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="输入学生姓名" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">学号</label>
              <input type="text" value={formData.studentId} onChange={e => setFormData({...formData, studentId: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="输入学号" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">课程/实训名称</label>
            <input type="text" value={formData.course} onChange={e => setFormData({...formData, course: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="输入课程/实训名称" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">实训成绩</label>
              <input type="number" value={formData.trainingGrade} onChange={e => setFormData({...formData, trainingGrade: Number(e.target.value)})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="0-100" min="0" max="100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">考试成绩</label>
              <input type="number" value={formData.examGrade} onChange={e => setFormData({...formData, examGrade: Number(e.target.value)})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="0-100" min="0" max="100" />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// --- Main App Component ---

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'teacher': return <TeacherManagement />;
      case 'student': return <StudentManagement />;
      case 'class': return <ClassManagement />;
      case 'training': return <TrainingManagement />;
      case 'course': return <CourseSchedule />;
      case 'announcement': return <AnnouncementManagement />;
      case 'analysis': return <LearningAnalysis />;
      case 'assignment': return <AssignmentManagement />;
      case 'exam': return <ExamManagement />;
      case 'grade': return <GradeManagement />;
      case 'domain': return <DomainManagement />;
      default: return <Dashboard />;
    }
  };

  const getTopLevelTab = () => {
    if (['dashboard'].includes(activeTab)) return 'dashboard';
    if (['teacher', 'student', 'class'].includes(activeTab)) return 'education';
    if (['training', 'course', 'announcement', 'analysis'].includes(activeTab)) return 'training';
    if (['assignment', 'exam', 'grade'].includes(activeTab)) return 'exam';
    if (['domain'].includes(activeTab)) return 'domain';
    return 'dashboard';
  };

  const topLevelTab = getTopLevelTab();

  const topNavItems = [
    { id: 'dashboard', label: '系统首页', icon: LayoutDashboard, defaultSub: 'dashboard' },
    { id: 'education', label: '教务中心', icon: Users, defaultSub: 'teacher' },
    { id: 'training', label: '实训任务', icon: BookOpen, defaultSub: 'training' },
    { id: 'exam', label: '作业考试', icon: FileEdit, defaultSub: 'assignment' },
    { id: 'domain', label: '域名管理', icon: Globe, defaultSub: 'domain' },
  ];

  const subNavItems: Record<string, { id: string, label: string }[]> = {
    education: [
      { id: 'teacher', label: '教师管理' },
      { id: 'student', label: '学生管理' },
      { id: 'class', label: '班级管理' },
    ],
    training: [
      { id: 'training', label: '实训管理' },
      { id: 'course', label: '课程安排' },
      { id: 'announcement', label: '实训公告' },
      { id: 'analysis', label: '学情分析' },
    ],
    exam: [
      { id: 'assignment', label: '作业管理' },
      { id: 'exam', label: '考试管理' },
      { id: 'grade', label: '成绩管理' },
    ],
  };

  const currentSubNav = subNavItems[topLevelTab] || [];

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans">
      <GlobalOverlays />
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-6 h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-indigo-600 tracking-tight mr-8">金隅实训系统</h1>
            <nav className="flex space-x-1">
              {topNavItems.map((item) => {
                const isActive = topLevelTab === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.defaultSub)}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive 
                        ? 'bg-indigo-50 text-indigo-700' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon size={18} className={`mr-2 ${isActive ? 'text-indigo-700' : 'text-gray-400'}`} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium text-gray-900">管理员</span>
                <span className="text-xs text-gray-500">深圳致学商科教育</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold border border-indigo-200">
                管
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600 transition-colors" title="退出登录">
              <LogOut size={20} />
            </button>
          </div>
        </div>
        
        {/* Secondary Navigation (Sub-tabs) */}
        {currentSubNav.length > 0 && (
          <div className="px-6 h-12 flex items-center border-t border-gray-100 bg-gray-50/50">
            <nav className="flex space-x-6">
              {currentSubNav.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`text-sm font-medium transition-colors relative h-12 flex items-center ${
                      isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
