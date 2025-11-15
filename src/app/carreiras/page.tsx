'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Clock, DollarSign, Users, Briefcase, ArrowRight, Award } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  department: string;
  description: string;
  requirements: string[];
  type: string;
  location: string;
  salary: string;
  active: boolean;
  createdAt: string;
}

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Desenvolvedor Frontend',
    department: 'Tecnologia',
    description: 'Desenvolver e manter interfaces web modernas e responsivas para nosso portal digital.',
    requirements: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Git'],
    type: 'CLT',
    location: 'São Paulo - SP',
    salary: 'R$ 8.000 - R$ 12.000',
    active: true,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Analista de Qualidade',
    department: 'Qualidade',
    description: 'Garantir a qualidade dos produtos através de análises e controles rigorosos.',
    requirements: ['Análise sensorial', 'Controle de qualidade', 'ISO 9001', 'Laboratório'],
    type: 'CLT',
    location: 'São Paulo - SP',
    salary: 'R$ 5.000 - R$ 7.000',
    active: true,
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    title: 'Coordenador de Produção',
    department: 'Produção',
    description: 'Coordenar equipes de produção e garantir eficiência nos processos.',
    requirements: ['Gestão de equipes', 'Lean Manufacturing', 'Segurança no trabalho', 'Excel'],
    type: 'CLT',
    location: 'Campinas - SP',
    salary: 'R$ 10.000 - R$ 15.000',
    active: true,
    createdAt: '2024-01-08'
  },
  {
    id: '4',
    title: 'Especialista em Marketing Digital',
    department: 'Marketing',
    description: 'Desenvolver estratégias digitais para fortalecer nossa presença online.',
    requirements: ['Marketing Digital', 'SEO/SEM', 'Google Analytics', 'Social Media'],
    type: 'PJ',
    location: 'Remoto',
    salary: 'R$ 6.000 - R$ 9.000',
    active: true,
    createdAt: '2024-01-05'
  }
];

export default function CarreirasPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('Todos');
  const [selectedType, setSelectedType] = useState('Todos');

  const departments = ['Todos', ...Array.from(new Set(mockJobs.map(job => job.department)))];
  const jobTypes = ['Todos', 'CLT', 'PJ', 'Estágio'];

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'Todos' || job.department === selectedDepartment;
    const matchesType = selectedType === 'Todos' || job.type === selectedType;
    
    return matchesSearch && matchesDepartment && matchesType && job.active;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Briefcase className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-4">
              Junte-se ao Nosso Time
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Faça parte de uma empresa que valoriza pessoas, promove crescimento profissional 
              e mantém viva a tradição da culinária autêntica brasileira.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
              <div className="text-gray-600">Colaboradores</div>
            </div>
            <div className="p-6">
              <Briefcase className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">15+</div>
              <div className="text-gray-600">Departamentos</div>
            </div>
            <div className="p-6">
              <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">75+</div>
              <div className="text-gray-600">Anos de Tradição</div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Vagas Disponíveis
            </h2>
            <p className="text-xl text-gray-600">
              Encontre a oportunidade perfeita para crescer conosco
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buscar vaga
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Título, descrição ou departamento..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Departamento
                </label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de contrato
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  {jobTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Job Cards */}
          <div className="space-y-6">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Nenhuma vaga encontrada
                </h3>
                <p className="text-gray-500">
                  Tente ajustar seus filtros ou volte mais tarde para novas oportunidades.
                </p>
              </div>
            ) : (
              filteredJobs.map(job => (
                <div key={job.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {job.title}
                        </h3>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                          {job.type}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3 leading-relaxed">
                        {job.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-1" />
                          {job.department}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {job.salary}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Publicado em {new Date(job.createdAt).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {job.requirements.slice(0, 3).map((req, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                            {req}
                          </span>
                        ))}
                        {job.requirements.length > 3 && (
                          <span className="text-gray-500 text-sm">
                            +{job.requirements.length - 3} requisitos
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6">
                      <Link
                        href={`/carreiras/${job.id}`}
                        className="inline-flex items-center bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
                      >
                        Candidatar-se
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Não Encontrou sua Vaga?
          </h2>
          <p className="text-xl mb-8">
            Envie seu currículo para nosso banco de talentos e entraremos em contato 
            quando surgir uma oportunidade adequada ao seu perfil.
          </p>
          <button className="bg-white text-green-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
            Enviar Currículo Espontâneo
          </button>
        </div>
      </section>
    </div>
  );
}