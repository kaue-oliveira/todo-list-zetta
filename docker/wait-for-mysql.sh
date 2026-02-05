#!/bin/bash

# Script para aguardar MySQL estar pronto antes de iniciar a aplicação
# Uso: ./wait-for-mysql.sh host port

HOST=$1
PORT=$2
TIMEOUT=${3:-60}

echo "Aguardando MySQL em $HOST:$PORT (timeout: ${TIMEOUT}s)..."

start_time=$(date +%s)

while true; do
    current_time=$(date +%s)
    elapsed=$((current_time - start_time))
    
    if [ $elapsed -gt $TIMEOUT ]; then
        echo "Timeout! MySQL não respondeu em ${TIMEOUT}s"
        exit 1
    fi
    
    if nc -z $HOST $PORT 2>/dev/null; then
        echo "✓ MySQL está pronto!"
        
        # Aguardar mais um pouco para ter certeza
        sleep 5
        
        # Tentar conexão com MySQL
        mysql -h $HOST -u root -proot -e "SELECT 1" 2>/dev/null
        if [ $? -eq 0 ]; then
            echo "✓ MySQL respondendo corretamente!"
            exit 0
        fi
    fi
    
    echo "Tentando novamente em 2s... (${elapsed}s/${TIMEOUT}s)"
    sleep 2
done
