import Image from "next/image";
import dynamic from "next/dynamic";
import ExpandItem from "@/components/home/ExpandItem";
import AvatarStack from "@/components/AvatarStack";
import { iconMap } from "@/lib/utils/iconMap";

const GithubContributions = dynamic(
  () => import("@/components/github/GithubContributions"),
  {
    loading: () => <div className="h-[120px]" />,
  }
);

export default function Home() {
  const mySkills = [
    "angular", "nextjs", "springboot", "nodejs",
    "mssql", "postgresql", "mongodb", "redis", "dockerfile"
  ];

  const renderSkillIcons = (keys: string[]) =>
    keys.map((key) => {
      const entry = iconMap[key];
      if (!entry) return null;
      const Icon = entry.icon;
      return (
        <span
          key={key}
          title={key}
          style={{ color: entry.color, fontSize: "1.5rem", marginLeft: "0.5rem" }}
        >
          <Icon />
        </span>
      );
    });

  return (
    <div className="pt-[50px] max-w-[700px] mx-auto px-4 pb-24 text-[var(--text-color)] dark:text-[var(--text-color-dark)]">

      {/* HEADER */}
      <div className={`relative mt-10`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* AvatarStack */}
          <div className="order-2 md:order-none">
            <h1 className="sr-only">
              Trần Hữu Đang – Fullstack Developer
            </h1>

            <p className="text-[40px] md:text-[50px] font-bold">
              Tran Huu Dang
            </p>

            <p className="text-[#2b2c2f] dark:text-[#E5E7EB] font-semibold">Fullstack developer</p>
          </div>

          <div className="md:static mx-auto mb-[50px] ml-[30%] md:ml-0 md:mb-0 md:mx-0">
            <AvatarStack />
          </div>

        </div>

        {/* SOCIAL */}
        <div className="flex flex-wrap gap-2 mt-6">
          {[
            { icon: "github", link: "https://github.com/dangtranhuu", label: "GitHub" },
            { icon: "leetcode", link: "https://leetcode.com/tranhuudang", label: "LeetCode" },
            { icon: "hackerrank", link: "https://www.hackerrank.com/tranhuudang", label: "HackerRank" },
            { icon: "linkedin", link: "https://www.linkedin.com/in/tranhuudang", label: "LinkedIn" },
            { icon: "youtube", link: "https://www.youtube.com/@devlands", label: "YouTube" },
            { icon: "facebook", link: "https://www.facebook.com/dangth.dev/", label: "Facebook" },
            { icon: "tiktok", link: "https://www.tiktok.com/@theanishtar", label: "TikTok" },
          ].map((s, i) => {
            const Icon = iconMap[s.icon].icon;
            return (
              <a
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Mở ${s.label}`}
                title={s.label}
                key={i}
                className="
            bg-[var(--contact-bc)] 
            dark:bg-[var(--contact-bc-dark)]

            text-[var(--contact-bc-dark)] 
            dark:text-[var(--contact-bc)]

            inline-flex items-center justify-center
            px-3 py-1 rounded text-[18px]

            transition-all duration-200 ease-out
            hover:scale-110 hover:-translate-y-[2px]
            hover:shadow-lg hover:shadow-[var(--contact-bc)/50]
            dark:hover:shadow-[var(--contact-bc-dark)/50]
          "
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>

      </div>

      {/* ABOUT */}
      <section className="mt-12 space-y-4 fade-in">
        <p>Tôi là Trần Hữu Đang, một Fullstack Developer với kinh nghiệm xây dựng web app sử dụng công nghệ hiện đại như Next.js, Angular, Spring Boot, Node.js, PostgreSQL, MongoDB và Redis.</p>
        <p>
          Tôi tập trung vào việc xây dựng những ứng dụng web có hiệu năng cao, kiến trúc rõ ràng
          và trải nghiệm người dùng mượt mà. Trong quá trình phát triển, tôi thường làm việc với
          các hệ thống realtime, websocket, xử lý sự kiện qua webhook, tích hợp AI vào sản phẩm
          và triển khai nhiều kỹ thuật tối ưu hiệu năng như caching, queue, lazy loading
          và database indexing.
        </p>
        <p>
          Tôi đảm nhiệm cả frontend và backend, từ thiết kế API, tối ưu server, xây dựng giao diện
          tương tác cho đến việc triển khai hệ thống thực tế. Tôi luôn ưu tiên các giải pháp có khả năng
          mở rộng, dễ bảo trì và tối ưu tài nguyên.
        </p>

        <p>Bên cạnh phát triển phần mềm, tôi còn quan tâm đến UI/UX, DevOps cơ bản và cloud computing. Tôi luôn học hỏi để cập nhật kiến thức, đồng thời chia sẻ qua Github và mạng xã hội.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span>Kỹ năng của tôi:</span>
          {renderSkillIcons(mySkills)}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="mt-12 fade-in">
        <h2 className="text-[32px] font-semibold mb-4">Experience</h2>

        <ExpandItem
          title="Devlands"
          subtitle="Designer & Content creator"
          time="2021–2023"
          logo="/images/exp/devlands.jpg"
        >
          Tôi xây dựng các bài học lập trình, hướng dẫn thiết kế giao diện và tạo ra một không gian chia sẻ kiến thức dành cho cộng đồng người học. Đây không phải là một dự án phần mềm, mà là hoạt động cá nhân giúp tôi cải thiện kỹ năng trình bày, thiết kế UI và viết nội dung kỹ thuật một cách rõ ràng, dễ tiếp cận.
        </ExpandItem>
      </section>

      {/* EDUCATION */}
      <section className="mt-12 fade-in">
        <h2 className="text-[32px] font-semibold mb-4">Education</h2>

        <ExpandItem
          title="Can Tho University"
          subtitle="Information Technology"
          time="Sep 2025 – Jan 2027"
          logo="/images/education/ctu.png"
        >
          Học về lập trình, cơ sở dữ liệu, phân tích hệ thống và nền tảng công nghệ thông tin.
        </ExpandItem>

        <ExpandItem
          title="FPT Polytechnic"
          subtitle="Software Development"
          time="Sep 2021 – Jan 2024"
          logo="/images/education/fpoly.jpg"
        >
          Tập trung thực hành trong các môn như OOP, thiết kế web, backend, test và phát triển ứng dụng thực tế.
        </ExpandItem>
      </section>

      {/* GITHUB CONTRIBUTIONS */}
      <section className="mt-12 fade-in">
        <h2 className="text-[32px] font-semibold mb-4">Github Contributions</h2>
        <GithubContributions />
      </section>

      {/* CERTIFICATIONS */}
      <section className="mt-12 fade-in text-center">
        <h2 className="text-[32px] font-semibold mb-4">Certifications</h2>
        <p>Tôi đã hoàn thành một số chứng chỉ quốc tế như:</p>
        <div className="flex flex-wrap gap-10 justify-center">
          {[
            {
              img: "udemy.png",
              title: "Master Microservices with Spring Boot & Spring Cloud",
              org: "Udemy",
              date: "02/08/2024",
            },
            {
              img: "aws-cloudfoundations.png",
              title: "AWS Academy Cloud Foundations",
              org: "AWS",
              date: "03/07/2022",
            },
            {
              img: "datacamp/statement-of-accomplishment.png",
              title: "Intermediate SQL Queries",
              org: "Data Camp",
              date: "APR 15, 2022",
            },
          ].map((cert, idx) => (
            <article key={idx} className="w-[250px]">
              <Image
                src={`/images/cert/${cert.img}`}
                alt={cert.title}
                width={100}
                height={100}
                className="mx-auto object-contain"
              />
              <div className="font-bold mt-2 text-[16px] whitespace-nowrap overflow-hidden text-ellipsis">
                {cert.title}
              </div>
              <div className="text-[14px] text-[#444] dark:text-gray-300">{cert.org}</div>
              <div className="text-[13px] text-[#666] dark:text-gray-300 mt-1">Issued {cert.date}</div>
            </article>
          ))}

          <p>Những chứng chỉ này giúp tôi củng cố kiến thức backend, cloud, và xử lý dữ liệu.</p>
        </div>
      </section>
    </div>
  );
}
