export default function Nutrition() {
    return (
      <>
        <div className="bg-gray-100 font-sans">
          <section className="text-center py-6 bg-white">
            <p className="mt-4 text-xl text-gray-700 font-medium">
              Petits conseils nutrition
            </p>
          </section>
        </div>
        <div className="flex flex-col items-center justify-center py-6 bg-white">
          <div className="flex flex-col md:flex-row gap-y-2 gap-x-16">
            <section className="h-16 bg-blue-100 text-blue-500 flex items-center justify-center rounded px-4">
              <p className="text-center text-lg text-blue-500 font-medium">
                Que manger avant un match de foot ?
              </p>
            </section>
            <section className="h-16 bg-blue-100 text-blue-500 flex items-center justify-center rounded px-4">
              <p className="text-center text-lg text-blue-500 font-medium">
                Que manger après un match de foot ?
              </p>
            </section>
          </div>
          <div className="flex flex-col md:flex-row gap-y-2 gap-x-16 mt-4">
            <section className="h-16 bg-blue-100 text-blue-500 flex items-center justify-center rounded px-4">
              <p className="text-center text-lg text-blue-500 font-medium">
                Explication
              </p>
            </section>
            <section className="h-16 bg-blue-100 text-blue-500 flex items-center justify-center rounded px-4">
              <p className="text-center text-lg text-blue-500 font-medium">
                Explication
              </p>
            </section>
          </div>
        </div>
        <div className="bg-gray-100 font-sans">
          <section className="text-center py-6 bg-white">
            <p className="mt-4 text-xl text-gray-700 font-medium">
              Achetez des articles dès maintenant !
            </p>
          </section>
        </div>
      </>
    );
  }
  