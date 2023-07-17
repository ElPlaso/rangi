import styles from "@/styles/page.module.css";

export default function InfoCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className={`${styles.card}`}>
      <h2 className="text-xl max-sm:pt-2 max-sm:px-2">{title}</h2>
      <p className="max-sm:px-2">{description}</p>
    </div>
  );
}
