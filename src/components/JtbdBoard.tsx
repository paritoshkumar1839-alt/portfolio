import Reveal from "@/components/Reveal";

/* ------------------------------------------------------------------ *
 * Jobs to be done, as a FigJam board — one section per user, the core
 * job as a large sticky and the supporting jobs as smaller ones. Each
 * job reads When · I want · So, so the structure is visible at a glance.
 * ------------------------------------------------------------------ */

type Job = { when: string; want: string; so: string };
type Person = { who: string; role: string; avatar: string; core: Job; jobs: Job[] };

const PEOPLE: Person[] = [
  {
    who: "Brand manager",
    role: "The restaurant",
    avatar: "/work/self-serve-go-live/v2/avatar-bm.png",
    core: {
      when: "I open new outlets",
      want: "to connect each one to UrbanPiper myself",
      so: "orders flow in on the date I promised",
    },
    jobs: [
      { when: "I've submitted stores", want: "to see where each one stands", so: "I don't have to chase anyone" },
      { when: "I assign menus", want: "to be sure each outlet gets the right one", so: "customers see the right items and prices" },
      { when: "a store fails", want: "to know why and fix it myself", so: "it doesn't become another email thread" },
    ],
  },
  {
    who: "Onboarding manager",
    role: "UrbanPiper",
    avatar: "/work/self-serve-go-live/v2/avatar-om.png",
    core: {
      when: "a brand wants stores connected",
      want: "them to handle the routine entry themselves",
      so: "my team only steps in on exceptions",
    },
    jobs: [
      { when: "a store fails", want: "a clear reason", so: "I can help without digging through raw errors" },
      { when: "brand managers ask “is it done yet?”", want: "them to already see the answer", so: "the question never reaches me" },
    ],
  },
];

const SHADOW = "0 1px 2px rgb(0 0 0 / 0.12), 0 8px 18px -8px rgb(0 0 0 / 0.22)";

function JobText({ job, big }: { job: Job; big?: boolean }) {
  const label = "mr-1.5 text-[10px] font-bold uppercase tracking-[0.12em] opacity-60";
  return (
    <p className={big ? "text-[17px] font-semibold leading-[25px]" : "text-[13.5px] font-medium leading-[20px]"}>
      <span className={label}>When</span>
      {job.when},<br />
      <span className={label}>I want</span>
      {job.want},<br />
      <span className={label}>So</span>
      {job.so}.
    </p>
  );
}

export default function JtbdBoard() {
  return (
    <div
      className="rounded-[14px] border border-line p-3 md:p-6"
      style={{
        backgroundColor: "#f3f3f1",
        backgroundImage: "radial-gradient(rgb(0 0 0 / 0.14) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {PEOPLE.map((p, pi) => (
          <section key={p.who} className="relative rounded-[12px] border border-black/10 bg-white/70 p-4 pt-12 md:p-5 md:pt-12">
            {/* FigJam section tab */}
            <span className="absolute left-4 top-3 rounded-[6px] bg-[#1e1e1e] px-2.5 py-1 text-[12px] font-semibold text-white md:left-5">
              {p.who}
              <span className="ml-2 font-normal text-white/60">{p.role}</span>
            </span>

            {/* core job — the big sticky */}
            <Reveal delay={pi * 120}>
              <div className="relative rounded-[3px] bg-[#bfe0ff] px-4 pb-4 pt-9 text-[#0b2a4a]" style={{ boxShadow: SHADOW }}>
                <div className="absolute left-4 top-3 flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.avatar} alt="" className="size-5 rounded-full object-cover ring-2 ring-white" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.12em] opacity-70">Core job</span>
                </div>
                <JobText job={p.core} big />
              </div>
            </Reveal>

            {/* supporting jobs — smaller stickies */}
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {p.jobs.map((j, k) => (
                <Reveal key={j.when + k} delay={pi * 120 + 100 + k * 80}>
                  <div className="h-full rounded-[3px] bg-[#ffe8a3] px-3.5 py-3 text-[#4a3600]" style={{ boxShadow: SHADOW }}>
                    <JobText job={j} />
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
