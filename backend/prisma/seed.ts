import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  // Seed articles
  const articles = [
    {
      title: "云幻教育荣获2024年度教育科技创新奖",
      content: "在近日举办的2024中国教育科技创新大会上，云幻教育科技股份有限公司凭借其在3D/AR/VR教育领域的卓越贡献，荣获年度教育科技创新奖。这一荣誉充分体现了云幻教育在推动教育信息化进程中的领先地位。",
      summary: "云幻教育在2024中国教育科技创新大会上荣获年度教育科技创新奖",
      category: "news",
      published: true,
    },
    {
      title: "虚拟仿真实验平台3.0版本正式发布",
      content: "云幻教育正式发布虚拟仿真实验平台3.0版本，新版本全面升级了3D渲染引擎，新增AI智能评分系统，支持更多学科的实验场景，为师生提供更加流畅、智能的实验体验。",
      summary: "平台3.0版本全面升级渲染引擎，新增AI智能评分",
      category: "news",
      published: true,
    },
    {
      title: "云幻教育与教育部签署战略合作协议",
      content: "云幻教育科技股份有限公司与教育部教育装备研究与发展中心签署战略合作协议，双方将在虚拟仿真实验教学、3D教育资源建设等领域开展深度合作，共同推动教育装备现代化。",
      summary: "双方将在虚拟仿真实验教学等领域深度合作",
      category: "news",
      published: true,
    },
    {
      title: "3D物理实验资源库全面覆盖新课标",
      content: "云幻教育3D物理实验资源库已完成全面升级，覆盖最新课程标准的所有实验项目，为教师提供丰富的教学资源和便捷的备课工具。",
      summary: "资源库覆盖新课标全部物理实验项目",
      category: "news",
      published: true,
    },
  ];

  for (const a of articles) {
    await prisma.article.upsert({
      where: { id: articles.indexOf(a) + 1 },
      update: a,
      create: a,
    });
  }

  // Seed site configs
  const configs = {
    company_name: "云幻教育科技股份有限公司",
    company_short: "云幻教育",
    company_en: "CLOUD MAGIC EDU",
    company_desc: "云幻教育科技股份有限公司是一家专注于3D/AR/VR教育产品研发的高新技术企业，致力于将前沿科技与教育教学深度融合，为全国中小学校提供优质的虚拟仿真实验解决方案。",
    phone: "400-888-8888",
    email: "contact@magicloudedu.com",
    address: "广东省深圳市南山区科技园南区云幻大厦",
    icp: "粤ICP备XXXXXXXX号",
    hero_title_1: "科技赋能教育",
    hero_subtitle_1: "3D/AR/VR教育产品领航者",
    hero_desc_1: "以创新技术重塑教学体验，让抽象知识触手可及",
    hero_title_2: "虚拟仿真实验",
    hero_subtitle_2: "沉浸式学习新范式",
    hero_desc_2: "覆盖物理、化学、生物全学科实验场景",
    hero_title_3: "智慧校园方案",
    hero_subtitle_3: "一站式教育信息化",
    hero_desc_3: "从实验室建设到教学资源，全方位赋能学校",
  };

  for (const [key, value] of Object.entries(configs)) {
    await prisma.siteConfig.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }

  console.log("Seed data inserted successfully");
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
