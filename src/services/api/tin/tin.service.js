import { useMutation } from "@tanstack/react-query";

const tinService = {
  lookupTin: async (tin) => {
    try {
      const response = await fetch(`https://orginfo.uz/api/v1/organization/search?tin=${tin}`);
      if (!response.ok) {
        throw new Error('TIN lookup failed');
      }
      return response.json();
    } catch (error) {
      throw new Error('Failed to lookup TIN data');
    }
  }
};

export const mapTinDataToCompanyData = (tinData) => {
  if (!tinData || !tinData.data) return null;
  
  const company = tinData.data;
  return {
    companyName: company.name || '',
    inn: company.tin || '',
    full_name: company.director_name || '',
    adress: company.address || '',
    company_name: company.full_name || '',
    short_name: company.short_name || '',
    org_and_legal_form: company.legal_form || '',
    form_of_ownership: company.ownership_form || '',
    oked: company.activity_code || '',
    registration_authority: company.registration_authority || '',
    data_register: company.registration_date || '',
    register_number: company.registration_number || '',
    information_of_director: company.director_name || '',
    phone_number: company.phone || '',
    email: company.email || '',
    address: company.address || ''
  };
};

export const useTinLookupMutation = (mutationSettings = {}) => {
  return useMutation({
    mutationFn: tinService.lookupTin,
    ...mutationSettings
  });
};
