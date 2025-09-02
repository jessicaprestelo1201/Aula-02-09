"use client";

import { useState, useEffect } from "react";
import { Card, Spin, Pagination } from "antd";
import Link from "next/link";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./users.module.css";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    // Função para buscar todos os usuários
    const fetchUsers = async () => {
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/users");
            setUsers(response.data);
            toast.success("Usuários carregados com sucesso!", {
                toastId: 'success-load' // ID único para evitar duplicatas
            });
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            toast.error("Erro ao carregar usuários.", {
                toastId: 'error-load'
            });
        } finally {
            setLoading(false);
        }
    };

    // Executa a busca quando o componente carrega
    useEffect(() => {
        fetchUsers();
    }, []);

    // Calcula quais usuários mostrar na página atual
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentUsers = users.slice(startIndex, endIndex);

    // Função para mudar de página
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Função para mudar quantidade de itens por página
    const handlePageSizeChange = (current, size) => {
        setPageSize(size);
        setCurrentPage(1);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Lista de Usuários</h1>

            {loading ? (
                // Tela de carregamento
                <div className={styles.loadingWrapper}>
                    <Spin size="large" />
                    <p className={styles.loadingText}>Carregando usuários...</p>
                </div>
            ) : (
                <>
                    {/* Controles de paginação */}
                    <div className={styles.controlsWrapper}>
                        <Pagination
                            total={users.length}
                            showTotal={(total) => `Total ${total} usuários`}
                            pageSize={pageSize}
                            current={currentPage}
                            showSizeChanger={true}
                            pageSizeOptions={["5", "10", "20"]}
                            onChange={handlePageChange}
                            onShowSizeChange={handlePageSizeChange}
                        />
                    </div>

                    {/* Lista de usuários em cards */}
                    <div className={styles.cardsContainer}>
                        {currentUsers.map((user) => (
                            <Link 
                                key={user.id} 
                                href={`/users/${user.id}`} 
                                className={styles.cardLink}
                            >
                                <Card className={styles.userCard} hoverable>
                                    <div className={styles.cardContent}>
                                        {/* Avatar com primeira letra do nome */}
                                        <div className={styles.avatar}>
                                            {user.name.charAt(0)}
                                        </div>
                                        
                                        {/* Informações do usuário */}
                                        <h3 className={styles.userName}>{user.name}</h3>
                                        <p className={styles.userEmail}>{user.email}</p>
                                        <p className={styles.userPhone}>{user.phone}</p>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </>
            )}

            {/* Container para mostrar as notificações toast */}
            <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

