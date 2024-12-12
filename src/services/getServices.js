
export const getServices = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/ServicesApi/api/get-all`);
  const serviceApi = await res.json();
  return serviceApi;
};

export const getServicesDetails = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/ServicesApi/api/${id}`);
  const serviceApi = await res.json();
  return serviceApi;
};
