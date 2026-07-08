import { Quote } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Naser Solutions hat unsere Online-Präsenz komplett transformiert. Die Website ist nicht nur wunderschön, sondern bringt uns auch deutlich mehr Kunden. Über 300.000 Follower auf TikTok!",
      name: "Ersin Baba",
      company: "Geschäftsführer, Di Döner Dieburg",
    },
    {
      quote:
        "Professionell, kreativ und zuverlässig. Das Team hat unsere Vision perfekt umgesetzt und stand uns bei jedem Schritt zur Seite. Die Zusammenarbeit war hervorragend.",
      name: "Sarah M.",
      company: "Marketing Managerin",
    },
    {
      quote:
        "Die Supermarkt-App hat unsere Kundenbindung auf ein neues Level gebracht. Push-Notifications und Coupons funktionieren einwandfrei – unsere Kunden lieben es.",
      name: "Michael K.",
      company: "Filialleiter",
    },
  ]

  return (
    <section id="referenzen" className="py-24 lg:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-lg mb-4 tracking-wide uppercase">Kundenmeinungen</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance">
            Das sagen unsere Kunden.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-background p-8 rounded-2xl border border-border">
              <Quote className="h-10 w-10 text-primary/30 mb-6" />
              <blockquote className="text-lg text-foreground leading-relaxed mb-8">„{testimonial.quote}"</blockquote>
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-muted-foreground">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
