"use client";

import axios from "axios";
import { Router, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Edit({ params }) {
    const [nim, setNim] = useState("");
    const [kodeMK, setKodeMK] = useState("");
    const [nilai, setNilai] = useState("");
    const Router = useRouter();

    useEffect(() => {
        axios
            .get(
                `http://127.0.0.1:8000/api/nilai-perkuliahan/${params.id_perkuliahan}`
            )
            .then((response) => {
                setNim(response.data.nim);
                setKodeMK(response.data.kode_mk);
                setNilai(response.data.nilai);
                console.log(response.data);
            })
            .catch((error) => console.error(error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/update-nilai-mahasiswa/${nim}/${kodeMK}`,
                { nilai }
            );
            console.log(response.data.message);
            Router.push("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white text-black">
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                        NIM
                    </label>
                    <input
                        type="text"
                        id="nim"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        onChange={(e) => setNim(e.target.value)}
                        value={nim}
                        disabled
                    />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                        Kode Mata Kuliah
                    </label>
                    <input
                        type="text"
                        id="kodeMK"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        onChange={(e) => setKodeMK(e.target.value)}
                        value={kodeMK}
                        disabled
                    />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                        Nilai
                    </label>
                    <input
                        type="number"
                        id="nilai"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        onChange={(e) => setNilai(e.target.value)}
                        value={nilai}
                    />
                </div>

                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    Perbarui Nilai
                </button>
            </form>
        </main>
    );
}
