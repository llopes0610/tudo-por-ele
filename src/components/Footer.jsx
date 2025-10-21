// components/Footer.jsx
export default function Footer(){
  return (
    <footer className="bg-[#0f1724] text-white text-center py-8 mt-8">
      <div className="max-w-6xl mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} Tudo Por Ele - Teologia Reformada</p>
        <p className="italic text-[#8aa2b8] mt-2">"Porque dele, e por ele, e para ele são todas as coisas" - Romanos 11:36</p>
      </div>
    </footer>
  )
}
