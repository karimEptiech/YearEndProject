<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220822112302 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE pot ADD description LONGTEXT DEFAULT NULL, ADD wishcardid INT NOT NULL, DROP open, DROP created_at, DROP date_limit');
        $this->addSql('ALTER TABLE user ADD bio LONGTEXT DEFAULT NULL, DROP type, DROP siret, DROP nickname, DROP birthday');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE pot ADD open TINYINT(1) NOT NULL, ADD created_at DATETIME NOT NULL, ADD date_limit DATETIME NOT NULL, DROP description, DROP wishcardid');
        $this->addSql('ALTER TABLE user ADD type VARCHAR(255) NOT NULL, ADD siret INT DEFAULT NULL, ADD nickname VARCHAR(255) DEFAULT NULL, ADD birthday DATE DEFAULT NULL, DROP bio');
    }
}
