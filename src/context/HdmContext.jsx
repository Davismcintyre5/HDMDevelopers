import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const HdmContext = createContext(null);

export const HdmProvider = ({ children }) => {
  const [company, setCompany] = useState(null);
  const [services, setServices] = useState([]);
  const [apps, setApps] = useState([]);
  const [projects, setProjects] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [c, s, a, p, ph] = await Promise.all([
          api.get('/hdm/api/company').catch(() => ({ data: null })),
          api.get('/hdm/api/services').catch(() => ({ data: [] })),
          api.get('/hdm/api/apps').catch(() => ({ data: [] })),
          api.get('/hdm/api/projects').catch(() => ({ data: [] })),
          api.get('/hdm/api/photos').catch(() => ({ data: [] })),
        ]);
        setCompany(c.data || null);
        setServices(Array.isArray(s.data) ? s.data : []);
        setApps(Array.isArray(a.data) ? a.data : []);
        setProjects(Array.isArray(p.data) ? p.data : []);
        setPhotos(Array.isArray(ph.data) ? ph.data : []);
      } catch (e) {
        console.error('HDM context error:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <HdmContext.Provider value={{ company, services, apps, projects, photos, loading }}>
      {children}
    </HdmContext.Provider>
  );
};

export const useHdm = () => {
  const ctx = useContext(HdmContext);
  if (!ctx) throw new Error('useHdm must be used within HdmProvider');
  return ctx;
};