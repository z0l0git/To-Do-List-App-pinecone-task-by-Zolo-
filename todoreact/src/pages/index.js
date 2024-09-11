import Todo from "@/components/Todo";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-100">Todo Board</h1>
      <Todo />
    </main>
  );
}
