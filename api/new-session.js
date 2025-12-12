let sessions = global.sessions || [];

export default function handler(req, res) {
  if (!global.sessions) global.sessions = sessions;

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const session = {
    code,
    status: "in_attesa",
    remote_code: null,
    timestamp: Date.now()
  };

  global.sessions.push(session);
  res.status(200).json(session);
}
