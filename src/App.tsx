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
  { id: 'S2023001', name: '陈明', school: '深圳致学商科教育咨询有限公司', className: '电商一班', major: '电子商务', account: 'chenming', phone: '13900139001', date: '2023-09-01', domain: 'edu.example.com', status: '正常' },
  { id: 'S2023002', name: '林悦', school: '深圳致学商科教育咨询有限公司', className: '电商一班', major: '电子商务', account: 'linyue', phone: '13900139002', date: '2023-09-01', domain: 'edu.example.com', status: '正常' },
  { id: 'S2023003', name: '赵强', school: '深圳致学商科教育咨询有限公司', className: '计算机二班', major: '计算机科学', account: 'zhaoqiang', phone: '13900139003', date: '2023-09-02', domain: 'edu.example.com', status: '禁用' },
];

let initialClasses = [
  { id: 'C001', name: '电商一班', type: '电商班', studentCount: 45, teacher: '李晓华', counselor: '张三', date: '2023-09-01' },
  { id: 'C002', name: '计算机二班', type: '计算机班', studentCount: 50, teacher: '王伟', counselor: '李四', date: '2023-09-02' },
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

function Table({ columns, data, actions, selectable, selectedIds = [], onSelectionChange, idAccessor = 'id' }: { columns: any[], data: any[], actions?: (row: any) => React.ReactNode, selectable?: boolean, selectedIds?: string[], onSelectionChange?: (ids: string[]) => void, idAccessor?: string }) {
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSelectionChange) {
      if (e.target.checked) {
        onSelectionChange(data.map(row => row[idAccessor]));
      } else {
        onSelectionChange([]);
      }
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (onSelectionChange) {
      if (checked) {
        onSelectionChange([...selectedIds, id]);
      } else {
        onSelectionChange(selectedIds.filter(selectedId => selectedId !== id));
      }
    }
  };

  const allSelected = data.length > 0 && selectedIds.length === data.length;
  const someSelected = selectedIds.length > 0 && selectedIds.length < data.length;

  return (
    <div className="overflow-x-auto bg-white rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {selectable && (
              <th scope="col" className="px-6 py-3 text-left w-12">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  checked={allSelected}
                  ref={input => {
                    if (input) input.indeterminate = someSelected;
                  }}
                  onChange={handleSelectAll}
                />
              </th>
            )}
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
              {selectable && (
                <td className="px-6 py-4 whitespace-nowrap w-12">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    checked={selectedIds.includes(row[idAccessor])}
                    onChange={(e) => handleSelectRow(row[idAccessor], e.target.checked)}
                  />
                </td>
              )}
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
  if (status === '已完成' || status === '已批改' || status === '已结束' || status === '已安排' || status === '启用' || status === '正常') color = 'bg-green-100 text-green-800';
  if (status === '未开始' || status === '未提交' || status === '未安排') color = 'bg-yellow-100 text-yellow-800';
  if (status === '禁用' || status === '停用') color = 'bg-red-100 text-red-800';
  
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
  const [view, setView] = useState<'list' | 'add'>('list');
  const [formData, setFormData] = useState({ 
    id: '', 
    name: '', 
    school: '深圳致学商科教育咨询有限公司', 
    password: '123456gzgmjs', 
    phone: '', 
    role: '教师' 
  });

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
    if (!formData.id || !formData.name || !formData.school || !formData.password || !formData.phone) {
      showToast('请填写完整信息', 'error');
      return;
    }
    const newTeacher = {
      id: formData.id,
      name: formData.name,
      school: formData.school,
      account: formData.id,
      phone: formData.phone,
      role: formData.role,
      date: new Date().toISOString().split('T')[0]
    };
    setTeachers([...teachers, newTeacher]);
    setView('list');
    setFormData({ id: '', name: '', school: '深圳致学商科教育咨询有限公司', password: '123456gzgmjs', phone: '', role: '教师' });
    showToast('教师添加成功', 'success');
  };

  const columns = [
    { 
      header: '教师信息', 
      render: (row: any) => (
        <div>
          <div className="font-medium text-gray-900">{row.name}</div>
          <div className="text-xs text-gray-500 mt-0.5">编号: {row.id}</div>
        </div>
      ) 
    },
    { header: '院校名称', accessor: 'school' },
    { 
      header: '联系方式', 
      render: (row: any) => (
        <div>
          <div className="text-gray-900">{row.phone}</div>
          <div className="text-xs text-gray-500 mt-0.5">账号: {row.account}</div>
        </div>
      ) 
    },
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

  if (view === 'add') {
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <div className="flex space-x-4 mb-10">
          <button className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition-colors">批量导入</button>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition-colors">下载导入模板</button>
        </div>

        <div className="max-w-3xl space-y-8">
          {/* 教职工编号 */}
          <div className="flex items-center">
            <div className="w-32 text-right pr-4 font-bold text-gray-700">
              <span className="text-red-500 mr-1">*</span> 教职工编号:
            </div>
            <div className="flex-1">
              <input 
                type="text" 
                value={formData.id}
                onChange={e => setFormData({...formData, id: e.target.value})}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
                placeholder="请输入教职工编号" 
              />
            </div>
          </div>

          {/* 登录账号 */}
          <div className="flex items-center">
            <div className="w-32 text-right pr-4 font-bold text-gray-700">
              登录账号:
            </div>
            <div className="flex-1 text-gray-900">
              将根据您填写的教师编号结合系统登录账号进行生成，请先填写教职工编号
            </div>
          </div>

          {/* 姓名 */}
          <div className="flex items-center">
            <div className="w-32 text-right pr-4 font-bold text-gray-700">
              <span className="text-red-500 mr-1">*</span> 姓名:
            </div>
            <div className="flex-1 relative">
              <input 
                type="text" 
                maxLength={100}
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full border border-gray-300 rounded px-4 py-2 pr-16 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
                placeholder="请输入教师姓名" 
              />
              <span className="absolute right-4 top-2.5 text-gray-400 text-sm">{formData.name.length}/100</span>
            </div>
          </div>

          {/* 院校名称 */}
          <div className="flex items-center">
            <div className="w-32 text-right pr-4 font-bold text-gray-700">
              <span className="text-red-500 mr-1">*</span> 院校名称:
            </div>
            <div className="flex-1 relative">
              <input 
                type="text" 
                maxLength={50}
                value={formData.school}
                onChange={e => setFormData({...formData, school: e.target.value})}
                className="w-full border border-gray-300 rounded px-4 py-2 pr-16 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
              />
              <span className="absolute right-4 top-2.5 text-gray-400 text-sm">{formData.school.length}/50</span>
            </div>
          </div>

          {/* 密码 */}
          <div className="flex items-center">
            <div className="w-32 text-right pr-4 font-bold text-gray-700">
              <span className="text-red-500 mr-1">*</span> 密码:
            </div>
            <div className="flex-1">
              <input 
                type="text" 
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
              />
            </div>
          </div>

          {/* 手机号 */}
          <div className="flex items-center">
            <div className="w-32 text-right pr-4 font-bold text-gray-700">
              <span className="text-red-500 mr-1">*</span> 手机号:
            </div>
            <div className="flex-1">
              <input 
                type="text" 
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
                placeholder="请输入手机号码"
              />
            </div>
          </div>

          {/* 确认添加 */}
          <div className="flex items-center pt-6">
            <div className="w-32 pr-4"></div>
            <div className="flex-1">
              <button onClick={handleAdd} className="bg-indigo-600 text-white px-8 py-2.5 rounded hover:bg-indigo-700 transition-colors">
                确认添加
              </button>
              <button onClick={() => setView('list')} className="ml-4 text-gray-500 hover:text-gray-700 px-4 py-2">
                返回列表
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <SearchBar placeholder="搜索教师姓名/账号/手机号" value={searchTerm} onChange={setSearchTerm} />
        <div className="flex space-x-3">
          <ActionButton icon={Upload} label="批量导入" variant="secondary" onClick={() => showToast('打开批量导入弹窗')} />
          <ActionButton icon={Plus} label="添加账号" onClick={() => setView('add')} />
        </div>
      </div>
      <Table columns={columns} data={filteredTeachers} actions={renderActions} />
    </div>
  );
}

function StudentManagement() {
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('所有班级');
  const [majorFilter, setMajorFilter] = useState('所有专业');
  const [view, setView] = useState<'list' | 'add'>('list');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [formData, setFormData] = useState({ 
    id: '', 
    name: '', 
    school: '深圳致学商科教育咨询有限公司', 
    password: '123456gzgmjs', 
    className: '', 
    major: '', 
    phone: '',
    domain: 'edu.example.com'
  });

  const filteredStudents = students.filter(s => {
    const matchSearch = s.name.includes(searchTerm) || s.id.includes(searchTerm);
    const matchClass = classFilter === '所有班级' || s.className === classFilter;
    const matchMajor = majorFilter === '所有专业' || s.major === majorFilter;
    return matchSearch && matchClass && matchMajor;
  });

  const handleDelete = (id: string) => {
    showConfirm('确定要移除该学生吗？', () => {
      setStudents(students.filter(s => s.id !== id));
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
      showToast('学生已移除', 'success');
    });
  };

  const handleBatchEnable = () => {
    if (selectedIds.length === 0) {
      showToast('请先选择学生', 'error');
      return;
    }
    showConfirm(`确定要启用选中的 ${selectedIds.length} 名学生吗？`, () => {
      setStudents(students.map(s => selectedIds.includes(s.id) ? { ...s, status: '正常' } : s));
      showToast('批量启用成功', 'success');
      setSelectedIds([]);
    });
  };

  const handleBatchDisable = () => {
    if (selectedIds.length === 0) {
      showToast('请先选择学生', 'error');
      return;
    }
    showConfirm(`确定要禁用选中的 ${selectedIds.length} 名学生吗？`, () => {
      setStudents(students.map(s => selectedIds.includes(s.id) ? { ...s, status: '禁用' } : s));
      showToast('批量禁用成功', 'success');
      setSelectedIds([]);
    });
  };

  const handleBatchEdit = () => {
    if (selectedIds.length === 0) {
      showToast('请先选择学生', 'error');
      return;
    }
    showToast(`打开批量修改弹窗，共选中 ${selectedIds.length} 名学生`);
  };

  const handleAdd = () => {
    if (!formData.id || !formData.name || !formData.school || !formData.password || !formData.className) {
      showToast('请填写完整信息', 'error');
      return;
    }
    const newStudent = {
      id: formData.id,
      name: formData.name,
      school: formData.school,
      className: formData.className,
      major: formData.major || '未分配',
      account: formData.id,
      phone: formData.phone || '未填写',
      domain: formData.domain || 'edu.example.com',
      status: '正常',
      date: new Date().toISOString().split('T')[0]
    };
    setStudents([...students, newStudent]);
    setView('list');
    setFormData({ id: '', name: '', school: '深圳致学商科教育咨询有限公司', password: '123456gzgmjs', className: '', major: '', phone: '', domain: 'edu.example.com' });
    showToast('学生添加成功', 'success');
  };

  const columns = [
    { 
      header: '学生信息', 
      render: (row: any) => (
        <div>
          <div className="font-medium text-gray-900">{row.name}</div>
          <div className="text-xs text-gray-500 mt-0.5">学号: {row.id}</div>
        </div>
      ) 
    },
    { header: '所属院校', accessor: 'school' },
    { 
      header: '班级/专业', 
      render: (row: any) => (
        <div>
          <div className="text-gray-900">{row.className}</div>
          <div className="text-xs text-gray-500 mt-0.5">{row.major}</div>
        </div>
      ) 
    },
    { 
      header: '联系方式', 
      render: (row: any) => (
        <div>
          <div className="text-gray-900">{row.phone}</div>
          <div className="text-xs text-gray-500 mt-0.5">账号: {row.account}</div>
        </div>
      ) 
    },
    { header: '域名绑定', accessor: 'domain' },
    { header: '状态', render: (row: any) => <StatusBadge status={row.status} /> },
    { header: '创建日期', accessor: 'date' },
  ];

  const renderActions = (row: any) => (
    <div className="flex justify-end space-x-2">
      <button className="text-indigo-600 hover:text-indigo-900" title="修改"><Edit size={18} /></button>
      {row.status === '正常' ? (
        <button onClick={() => {
          setStudents(students.map(s => s.id === row.id ? { ...s, status: '禁用' } : s));
          showToast('已禁用', 'success');
        }} className="text-yellow-600 hover:text-yellow-900" title="禁用"><Ban size={18} /></button>
      ) : (
        <button onClick={() => {
          setStudents(students.map(s => s.id === row.id ? { ...s, status: '正常' } : s));
          showToast('已启用', 'success');
        }} className="text-green-600 hover:text-green-900" title="启用"><CheckCircle size={18} /></button>
      )}
      <button onClick={() => handleDelete(row.id)} className="text-red-600 hover:text-red-900" title="移除"><Trash2 size={18} /></button>
    </div>
  );

  if (view === 'add') {
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <div className="flex space-x-4 mb-10">
          <button className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition-colors">批量导入</button>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition-colors">下载导入模板</button>
        </div>

        <div className="max-w-3xl space-y-8">
          {/* 学生学号 */}
          <div className="flex items-center">
            <div className="w-32 text-right pr-4 font-bold text-gray-700">
              <span className="text-red-500 mr-1">*</span> 学生学号:
            </div>
            <div className="flex-1">
              <input 
                type="text" 
                value={formData.id}
                onChange={e => setFormData({...formData, id: e.target.value})}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
                placeholder="请输入学生学号" 
              />
            </div>
          </div>

          {/* 登录账号 */}
          <div className="flex items-center">
            <div className="w-32 text-right pr-4 font-bold text-gray-700">
              登录账号:
            </div>
            <div className="flex-1 text-gray-900">
              将根据您填写的学号结合系统登录账号进行生成，请先填写学生学号
            </div>
          </div>

          {/* 姓名 */}
          <div className="flex items-center">
            <div className="w-32 text-right pr-4 font-bold text-gray-700">
              <span className="text-red-500 mr-1">*</span> 姓名:
            </div>
            <div className="flex-1 relative">
              <input 
                type="text" 
                maxLength={20}
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full border border-gray-300 rounded px-4 py-2 pr-16 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
                placeholder="请输入学生姓名" 
              />
              <span className="absolute right-4 top-2.5 text-gray-400 text-sm">{formData.name.length}/20</span>
            </div>
          </div>

          {/* 院校名称 */}
          <div className="flex items-center">
            <div className="w-32 text-right pr-4 font-bold text-gray-700">
              <span className="text-red-500 mr-1">*</span> 院校名称:
            </div>
            <div className="flex-1 relative">
              <input 
                type="text" 
                maxLength={50}
                value={formData.school}
                onChange={e => setFormData({...formData, school: e.target.value})}
                className="w-full border border-gray-300 rounded px-4 py-2 pr-16 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
              />
              <span className="absolute right-4 top-2.5 text-gray-400 text-sm">{formData.school.length}/50</span>
            </div>
          </div>

          {/* 密码 */}
          <div className="flex items-center">
            <div className="w-32 text-right pr-4 font-bold text-gray-700">
              <span className="text-red-500 mr-1">*</span> 密码:
            </div>
            <div className="flex-1">
              <input 
                type="text" 
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
              />
            </div>
          </div>

          {/* 实训班级 */}
          <div className="flex items-center">
            <div className="w-32 text-right pr-4 font-bold text-gray-700">
              <span className="text-red-500 mr-1">*</span> 实训班级:
            </div>
            <div className="flex-1 flex items-center space-x-4">
              <select 
                value={formData.className}
                onChange={e => setFormData({...formData, className: e.target.value})}
                className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-700 bg-white"
              >
                <option value="" disabled>请选择实训班级</option>
                <option value="电商一班">电商一班</option>
                <option value="计算机二班">计算机二班</option>
              </select>
              <button className="text-indigo-600 hover:text-indigo-700 flex items-center whitespace-nowrap">
                <Plus size={16} className="mr-1" /> 添加实训班级
              </button>
            </div>
          </div>

          {/* 手机号 */}
          <div className="flex items-center">
            <div className="w-32 text-right pr-4 font-bold text-gray-700">
              手机号:
            </div>
            <div className="flex-1">
              <input 
                type="text" 
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
                placeholder="请输入手机号码"
              />
            </div>
          </div>

          {/* 专业 */}
          <div className="flex items-center">
            <div className="w-32 text-right pr-4 font-bold text-gray-700">
              专业:
            </div>
            <div className="flex-1">
              <input 
                type="text" 
                value={formData.major}
                onChange={e => setFormData({...formData, major: e.target.value})}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
                placeholder="请输入专业"
              />
            </div>
          </div>

          {/* 域名绑定 */}
          <div className="flex items-center">
            <div className="w-32 text-right pr-4 font-bold text-gray-700">
              域名绑定:
            </div>
            <div className="flex-1">
              <input 
                type="text" 
                value={formData.domain}
                onChange={e => setFormData({...formData, domain: e.target.value})}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
                placeholder="例如: edu.example.com"
              />
            </div>
          </div>

          {/* 确认添加 */}
          <div className="flex items-center pt-6">
            <div className="w-32 pr-4"></div>
            <div className="flex-1">
              <button onClick={handleAdd} className="bg-indigo-600 text-white px-8 py-2.5 rounded hover:bg-indigo-700 transition-colors">
                确认添加
              </button>
              <button onClick={() => setView('list')} className="ml-4 text-gray-500 hover:text-gray-700 px-4 py-2">
                返回列表
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div className="flex flex-wrap items-center gap-4 flex-1">
          <SearchBar placeholder="搜索学生姓名/学号" value={searchTerm} onChange={setSearchTerm} />
          <select 
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
          >
            <option>所有班级</option>
            <option>电商一班</option>
            <option>计算机二班</option>
          </select>
          <select 
            value={majorFilter}
            onChange={(e) => setMajorFilter(e.target.value)}
            className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
          >
            <option>所有专业</option>
            <option>电子商务</option>
            <option>计算机科学</option>
          </select>
        </div>
        <div className="flex items-center space-x-3">
          <ActionButton icon={Upload} label="批量导入" variant="secondary" onClick={() => showToast('打开批量导入弹窗')} />
          <ActionButton icon={Plus} label="添加账号" onClick={() => setView('add')} />
        </div>
      </div>

      {selectedIds.length > 0 && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3 flex items-center justify-between">
          <div className="text-sm text-indigo-700 font-medium flex items-center">
            <CheckCircle size={16} className="mr-2" />
            已选择 {selectedIds.length} 名学生
          </div>
          <div className="flex space-x-3">
            <ActionButton icon={CheckCircle} label="批量启用" variant="secondary" onClick={handleBatchEnable} />
            <ActionButton icon={Ban} label="批量禁用" variant="secondary" onClick={handleBatchDisable} />
            <ActionButton icon={Edit} label="批量修改" variant="secondary" onClick={handleBatchEdit} />
          </div>
        </div>
      )}

      <Table 
        columns={columns} 
        data={filteredStudents} 
        actions={renderActions} 
        selectable 
        selectedIds={selectedIds} 
        onSelectionChange={setSelectedIds} 
      />
    </div>
  );
}

function ClassManagement() {
  const [classes, setClasses] = useState(initialClasses);
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'list' | 'add'>('list');
  const [formData, setFormData] = useState({ name: '', type: '必修', teacher: '', counselor: '' });

  const filteredClasses = classes.filter(c => c.name.includes(searchTerm));

  const handleDelete = (id: string) => {
    showConfirm('确定要删除该班级吗？', () => {
      setClasses(classes.filter(c => c.id !== id));
      showToast('班级已删除', 'success');
    });
  };

  const handleAdd = () => {
    if (!formData.name || !formData.type || !formData.teacher || !formData.counselor) {
      showToast('请填写完整信息', 'error');
      return;
    }
    const newClass = {
      id: `C00${classes.length + 1}`,
      name: formData.name,
      type: formData.type,
      teacher: formData.teacher,
      counselor: formData.counselor,
      studentCount: 0,
      date: new Date().toISOString().split('T')[0]
    };
    setClasses([...classes, newClass]);
    setView('list');
    setFormData({ name: '', type: '必修', teacher: '', counselor: '' });
    showToast('班级添加成功', 'success');
  };

  const columns = [
    { header: '班级名称', accessor: 'name' },
    { header: '班级类型', accessor: 'type' },
    { header: '学生数量', accessor: 'studentCount' },
    { header: '班主任', accessor: 'teacher' },
    { header: '辅导员', accessor: 'counselor' },
    { header: '创建时间', accessor: 'date' },
  ];

  const renderActions = (row: any) => (
    <div className="flex justify-end space-x-2">
      <button className="text-indigo-600 hover:text-indigo-900" title="修改"><Edit size={18} /></button>
      <button onClick={() => handleDelete(row.id)} className="text-red-600 hover:text-red-900" title="删除"><Trash2 size={18} /></button>
    </div>
  );

  if (view === 'add') {
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <div className="flex space-x-4 mb-10">
          <button className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition-colors">批量导入</button>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition-colors">下载导入模板</button>
        </div>

        <div className="max-w-3xl space-y-8">
          {/* 班级名称 */}
          <div className="flex items-center">
            <div className="w-32 text-right pr-4 font-bold text-gray-700">
              <span className="text-red-500 mr-1">*</span> 班级名称:
            </div>
            <div className="flex-1">
              <input 
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
                placeholder="请输入班级名称" 
              />
            </div>
          </div>

          {/* 班级类型 */}
          <div className="flex items-center">
            <div className="w-32 text-right pr-4 font-bold text-gray-700">
              班级类型:
            </div>
            <div className="flex-1">
              <select 
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white"
              >
                <option value="必修">必修</option>
                <option value="选修">选修</option>
              </select>
            </div>
          </div>

          {/* 学生数量 */}
          <div className="flex items-center">
            <div className="w-32 text-right pr-4 font-bold text-gray-700">
              学生数量:
            </div>
            <div className="flex-1 text-gray-900">
              0
            </div>
          </div>

          {/* 班主任 */}
          <div className="flex items-center">
            <div className="w-32 text-right pr-4 font-bold text-gray-700">
              班主任:
            </div>
            <div className="flex-1">
              <input 
                type="text" 
                value={formData.teacher}
                onChange={e => setFormData({...formData, teacher: e.target.value})}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
                placeholder="请输入班主任姓名" 
              />
            </div>
          </div>

          {/* 辅导员 */}
          <div className="flex items-center">
            <div className="w-32 text-right pr-4 font-bold text-gray-700">
              辅导员:
            </div>
            <div className="flex-1">
              <input 
                type="text" 
                value={formData.counselor}
                onChange={e => setFormData({...formData, counselor: e.target.value})}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" 
                placeholder="请输入辅导员姓名" 
              />
            </div>
          </div>

          {/* 确认添加 */}
          <div className="flex items-center pt-6">
            <div className="w-32 pr-4"></div>
            <div className="flex-1">
              <button onClick={handleAdd} className="bg-indigo-600 text-white px-8 py-2.5 rounded hover:bg-indigo-700 transition-colors">
                确认添加
              </button>
              <button onClick={() => setView('list')} className="ml-4 text-gray-500 hover:text-gray-700 px-4 py-2">
                返回列表
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <SearchBar placeholder="搜索班级名称" value={searchTerm} onChange={setSearchTerm} />
        <div className="flex space-x-3">
          <ActionButton icon={Users} label="批量导入学生至班级" variant="secondary" onClick={() => showToast('打开导入弹窗')} />
          <ActionButton icon={Plus} label="添加班级" onClick={() => setView('add')} />
        </div>
      </div>
      <Table columns={columns} data={filteredClasses} actions={renderActions} />
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

function TeachingCalendar() {
  const [examStatus, setExamStatus] = useState('全部');
  const [courseType, setCourseType] = useState('全部');
  const [courseStatus, setCourseStatus] = useState('全部');
  const [teacher, setTeacher] = useState('全部');
  const [period, setPeriod] = useState('2026-03');

  const handleSearch = () => {
    showToast('搜索成功', 'success');
  };

  const handleClear = () => {
    setExamStatus('全部');
    setCourseType('全部');
    setCourseStatus('全部');
    setTeacher('全部');
    setPeriod('2026-03');
  };

  const daysOfWeek = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
  
  // Mock calendar data for March 2026
  // March 1st 2026 is a Sunday (index 6)
  const calendarDays = Array.from({ length: 35 }, (_, i) => {
    const dayNumber = i - 5; // offset so 1 is on Sunday
    if (dayNumber > 0 && dayNumber <= 31) {
      return {
        date: dayNumber,
        events: dayNumber === 2 ? [
          { time: '上午第三节', class: '电商', more: 1 }
        ] : []
      };
    }
    return null;
  });

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">考试状态:</label>
          <select 
            value={examStatus} 
            onChange={e => setExamStatus(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white min-w-[120px]"
          >
            <option value="全部">全部</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">课程类型:</label>
          <select 
            value={courseType} 
            onChange={e => setCourseType(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white min-w-[120px]"
          >
            <option value="全部">全部</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">课程状态:</label>
          <select 
            value={courseStatus} 
            onChange={e => setCourseStatus(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white min-w-[120px]"
          >
            <option value="全部">全部</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">老师:</label>
          <select 
            value={teacher} 
            onChange={e => setTeacher(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white min-w-[120px]"
          >
            <option value="全部">全部</option>
          </select>
        </div>
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-1.5 rounded text-sm flex items-center hover:bg-blue-600 transition-colors">
          <Search size={14} className="mr-1" /> 搜索
        </button>
        <button onClick={handleClear} className="text-blue-500 text-sm hover:text-blue-700 transition-colors">
          清除所有筛选
        </button>
      </div>

      {/* Second row filters & Legend */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">实训周期:</label>
          <div className="relative">
            <input 
              type="month" 
              value={period}
              onChange={e => setPeriod(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white min-w-[150px]"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center"><span className="w-4 h-4 bg-teal-400 rounded-sm mr-2"></span>课程已教学</div>
          <div className="flex items-center"><span className="w-4 h-4 bg-gray-200 rounded-sm mr-2"></span>课程待教学</div>
          <div className="flex items-center"><span className="w-4 h-4 bg-indigo-500 rounded-sm mr-2"></span>待考试</div>
          <div className="flex items-center"><span className="w-4 h-4 bg-orange-300 rounded-sm mr-2"></span>考试中</div>
          <div className="flex items-center"><span className="w-4 h-4 bg-red-500 rounded-sm mr-2"></span>考试结束</div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="border border-gray-200 rounded-sm overflow-hidden">
        <div className="grid grid-cols-7 bg-gray-100 border-b border-gray-200">
          {daysOfWeek.map((day, index) => (
            <div key={day} className={`py-3 text-center text-sm font-medium ${index >= 5 ? 'text-red-500' : 'text-gray-700'} border-r border-gray-200 last:border-r-0`}>
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 auto-rows-[120px]">
          {calendarDays.map((day, index) => (
            <div key={index} className="border-r border-b border-gray-200 last:border-r-0 relative p-1">
              {day && (
                <>
                  <div className="text-center font-bold text-gray-800 mb-1">{day.date}</div>
                  {day.events.map((event, i) => (
                    <div key={i} className="bg-gray-100 text-xs p-1.5 rounded-sm mb-1">
                      <div className="text-gray-700">课节安排：{event.time}</div>
                      <div className="text-gray-700">实训班级：{event.class}</div>
                      {event.more > 0 && <div className="text-gray-500 truncate">同时段还有{event.more}节...</div>}
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
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

function Login({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('');

  const generateCaptcha = () => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptchaCode(code);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      showToast('请填写账号和密码', 'error');
      return;
    }
    // 取消验证码的实际验证功能
    // if (captchaInput.toLowerCase() !== captchaCode.toLowerCase()) {
    //   showToast('验证码错误', 'error');
    //   generateCaptcha();
    //   setCaptchaInput('');
    //   return;
    // }
    showToast('登录成功', 'success');
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <GlobalOverlays />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          金隅实训系统
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          请输入您的账号和密码进行登录
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                账号
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="请输入账号"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                密码
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="请输入密码"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                验证码
              </label>
              <div className="mt-1 flex space-x-2">
                <input
                  type="text"
                  required
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="请输入验证码"
                />
                <div 
                  className="flex-shrink-0 w-24 bg-gray-100 flex items-center justify-center rounded-md border border-gray-300 cursor-pointer select-none hover:bg-gray-200 transition-colors"
                  onClick={generateCaptcha}
                  title="点击刷新验证码"
                >
                  <span className="text-lg font-bold text-indigo-600 tracking-widest italic" style={{ textDecoration: 'line-through' }}>
                    {captchaCode}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                登录
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'teacher': return <TeacherManagement />;
      case 'student': return <StudentManagement />;
      case 'class': return <ClassManagement />;
      case 'training': return <TrainingManagement />;
      case 'course': return <TeachingCalendar />;
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
      { id: 'course', label: '教学日历' },
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
            <button 
              onClick={() => {
                showConfirm('确定要退出登录吗？', () => {
                  setIsLoggedIn(false);
                  showToast('已退出登录', 'success');
                });
              }}
              className="text-gray-400 hover:text-gray-600 transition-colors" 
              title="退出登录"
            >
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
