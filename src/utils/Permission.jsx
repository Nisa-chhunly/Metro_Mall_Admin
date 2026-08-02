export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("currentUser"));
};


export const hasPermission = (permission) => {

    const user = getCurrentUser();

    if(!user) return false;


    // Super Admin gets everything
    if(user.role === "Super Admin"){
        return true;
    }


    return user.permissions.includes(permission);
};