"use client";

import { Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Sistema de Usuários</h1>
                
                <p className={styles.description}>
                    Bem-vindo! Clique no botão abaixo para ver a lista de usuários.
                </p>
                
                <Link href="/users">
                    <Button 
                        type="primary" 
                        size="large"
                        icon={<UserOutlined />}
                        className={styles.button}
                    >
                        Ver Usuários
                    </Button>
                </Link>
            </div>
        </div>
    );
}
