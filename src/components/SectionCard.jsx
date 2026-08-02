export default function SectionCard({ title, children }) {

    return (

        <div className="bg-white rounded-xl shadow-md">

            <div className="border-b px-6 py-4">

                <h2 className="font-semibold text-lg">
                    {title}
                </h2>

            </div>

            <div className="p-6">

                {children}

            </div>

        </div>

    );

}