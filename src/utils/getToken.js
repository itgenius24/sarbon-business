
export async function getToken(userId) {
  const res = await fetch("http://localhost:5000/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });

  const data = await res.json();
  return await data.token;
}
