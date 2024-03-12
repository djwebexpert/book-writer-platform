// Cookies
export const getCookie = (cookieName: string): string | null => {
  if (!document) {
    return null;
  }
  const cookies = document.cookie.split(";");
  const cookie = cookies.find((cookie) =>
    cookie.trim().startsWith(cookieName + "=")
  );
  return cookie ? cookie.trim().substring(cookieName.length + 1) : null;
};

export const setCookie = (cookieName: string, cookieValue: any): void => {
  const expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + 1);
  const cookieString = `${cookieName}=${cookieValue}; expires=${expireDate.toUTCString()}; path=/`;
  document.cookie = cookieString;
};

export const removeCookie = (cookieName: string): void => {
  const previousDate = new Date(0).toUTCString();
  document.cookie = `${cookieName}=; expires=` + previousDate;
};
