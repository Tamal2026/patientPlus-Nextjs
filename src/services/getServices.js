"use client"
export const getServices = async () => {
    const res = await fetch("http://localhost:3000/ServicesApi/api/get-all");
    const serviceApi = await res.json();
    return serviceApi;
  };

export  const getServicesDetails = async (id) => {
    const res = await fetch(`http://localhost:3000/ServicesApi/api/${id}`);
    const serviceApi = await res.json();
    return serviceApi;
  };