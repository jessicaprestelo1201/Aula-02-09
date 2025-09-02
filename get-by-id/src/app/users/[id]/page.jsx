"use client";

import { useState, useEffect, use } from "react";
import { Card, Spin, Button, Descriptions } from "antd";
import { ArrowLeftOutlined, UserOutlined, EnvironmentOutlined, BankOutlined } from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";
import styles from "./[id].module.css";

export default function UserDetailsPage({ params }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const resolvedParams = use(params);

    // Função simplificada para buscar usuário
    const fetchUser = async (userId) => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
            setUser(response.data);
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Executa a busca quando o componente carrega
    useEffect(() => {
        if (resolvedParams?.id) {
            fetchUser(resolvedParams.id);
        }
    }, [resolvedParams?.id]);

    // Tela de carregamento
    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loadingWrapper}>
                    <Spin size="large" />
                    <p className={styles.loadingText}>Carregando detalhes do usuário...</p>
                </div>
            </div>
        );
    }

    // Tela de erro (usuário não encontrado)
    if (!user) {
        return (
            <div className={styles.container}>
                <div className={styles.errorWrapper}>
                    <h3>Usuário não encontrado</h3>
                    <Link href="/users">
                        <Button type="primary" icon={<ArrowLeftOutlined />}>
                            Voltar para lista
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    // Conteúdo principal
    return (
        <div className={styles.container}>
            {/* Cabeçalho com botão voltar */}
            <div className={styles.header}>
                <Link href="/users">
                    <Button icon={<ArrowLeftOutlined />} className={styles.backButton}>
                        Voltar
                    </Button>
                </Link>
                <h2 className={styles.title}>Detalhes do Usuário</h2>
            </div>

            <div className={styles.contentWrapper}>
                {/* Card com foto e info principal */}
                <Card className={styles.mainCard}>
                    <div className={styles.userHeader}>
                        <div className={styles.avatar}>
                            <UserOutlined className={styles.avatarIcon} />
                        </div>
                        <div className={styles.userInfo}>
                            <h3 className={styles.userName}>{user.name}</h3>
                            <p className={styles.username}>@{user.username}</p>
                            <p className={styles.email}>{user.email}</p>
                        </div>
                    </div>
                </Card>

                {/* Informações Pessoais */}
                <Card 
                    title={<><UserOutlined /> Informações Pessoais</>}
                    className={styles.detailCard}
                >
                    <Descriptions column={1} bordered>
                        <Descriptions.Item label="Nome Completo">
                            {user.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Nome de Usuário">
                            {user.username}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email">
                            {user.email}
                        </Descriptions.Item>
                        <Descriptions.Item label="Telefone">
                            {user.phone}
                        </Descriptions.Item>
                        <Descriptions.Item label="Website">
                            <a href={`http://${user.website}`} target="_blank">
                                {user.website}
                            </a>
                        </Descriptions.Item>
                    </Descriptions>
                </Card>

                {/* Endereço */}
                <Card 
                    title={<><EnvironmentOutlined /> Endereço</>}
                    className={styles.detailCard}
                >
                    <Descriptions column={1} bordered>
                        <Descriptions.Item label="Rua">
                            {user.address.street}
                        </Descriptions.Item>
                        <Descriptions.Item label="Complemento">
                            {user.address.suite}
                        </Descriptions.Item>
                        <Descriptions.Item label="Cidade">
                            {user.address.city}
                        </Descriptions.Item>
                        <Descriptions.Item label="CEP">
                            {user.address.zipcode}
                        </Descriptions.Item>
                        <Descriptions.Item label="Coordenadas">
                            Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}
                        </Descriptions.Item>
                    </Descriptions>
                </Card>

                {/* Informações da Empresa */}
                <Card 
                    title={<><BankOutlined /> Empresa</>}
                    className={styles.detailCard}
                >
                    <Descriptions column={1} bordered>
                        <Descriptions.Item label="Nome da Empresa">
                            {user.company.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Slogan">
                            {user.company.catchPhrase}
                        </Descriptions.Item>
                        <Descriptions.Item label="Área de Negócio">
                            {user.company.bs}
                        </Descriptions.Item>
                    </Descriptions>
                </Card>
            </div>
        </div>
    );
}
