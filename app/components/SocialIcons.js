export default function SocialIcons({ size = "md" }) {
  const iconSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  const spacing = size === "sm" ? "space-x-4" : "space-x-6";
  
  const socialLinks = [
    {
      name: "YouTube",
      url: "https://www.youtube.com/@jincamusic/",
      icon: (
        <svg className={iconSize} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/jincamusic",
      icon: (
        <svg className={iconSize} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} x={2} y={2} width={20} height={20} rx={5} ry={5} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
          <line strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      name: "TikTok",
      url: "https://www.tiktok.com/@jincapiano",
      icon: (
        <svg className={iconSize} fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.04-.1z" />
        </svg>
      ),
    },
    {
      name: "Spotify",
      url: "https://open.spotify.com/intl-fr/artist/0qyXG2B0ngmb7xYEfZvr37?si=m0Kh1AGrRrWnsAi9hqGghw",
      icon: (
        <svg className={iconSize} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.66 0-.36.24-.66.54-.779 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      ),
    },
    {
      name: "Apple Music",
      url: "https://music.apple.com/us/artist/jinca/1776730935",
      icon: (
        <svg className={iconSize} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V5l12-3v14M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
    },
    {
      name: "Deezer",
      url: "https://www.deezer.com/fr/artist/227240705",
      icon: (
        <svg className={iconSize} fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.81 4.16v3.03h-1.5V4.16h1.5zm-2.25 0v3.03h-1.5V4.16h1.5zm-2.25 0v3.03h-1.5V4.16h1.5zm-2.25 0v3.03h-1.5V4.16h1.5zm-2.25 0v3.03H8.31V4.16h1.5zm-2.25 0v3.03H6.06V4.16h1.5zm-2.25 0v3.03H3.81V4.16h1.5zm-2.25 0v3.03H1.56V4.16h1.5zm13.5 4.5v3.03h-1.5V8.66h1.5zm-2.25 0v3.03h-1.5V8.66h1.5zm-2.25 0v3.03h-1.5V8.66h1.5zm-2.25 0v3.03h-1.5V8.66h1.5zm-2.25 0v3.03H8.31V8.66h1.5zm-2.25 0v3.03H6.06V8.66h1.5zm-2.25 0v3.03H3.81V8.66h1.5zm-2.25 0v3.03H1.56V8.66h1.5zm13.5 4.5v3.03h-1.5v-3.03h1.5zm-2.25 0v3.03h-1.5v-3.03h1.5zm-2.25 0v3.03h-1.5v-3.03h1.5zm-2.25 0v3.03h-1.5v-3.03h1.5zm-2.25 0v3.03H8.31v-3.03h1.5zm-2.25 0v3.03H6.06v-3.03h1.5zm-2.25 0v3.03H3.81v-3.03h1.5zm-2.25 0v3.03H1.56v-3.03h1.5zm13.5 4.5v3.03h-1.5v-3.03h1.5zm-2.25 0v3.03h-1.5v-3.03h1.5zm-2.25 0v3.03h-1.5v-3.03h1.5zm-2.25 0v3.03h-1.5v-3.03h1.5zm-2.25 0v3.03H8.31v-3.03h1.5zm-2.25 0v3.03H6.06v-3.03h1.5zm-2.25 0v3.03H3.81v-3.03h1.5zm-2.25 0v3.03H1.56v-3.03h1.5z" />
        </svg>
      ),
    },
  ];

  return (
    <div className={`flex items-center ${spacing}`}>
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black/40 hover:text-black transition-colors duration-300"
          aria-label={social.name}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}
