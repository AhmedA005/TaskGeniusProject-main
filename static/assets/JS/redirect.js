
function redirectToPage() {
    const isAdmin = document.getElementById("admin").checked;
    if (isAdmin) {
        window.location.href = "{% url 'home' %}";
    } else {
        window.location.href = "{% url 'TeacherHome' %}";

    }
}
