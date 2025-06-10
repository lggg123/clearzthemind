import React from 'react';
import styles from './NeuralPathwaysSidebar.module.css';
import { NeuralNode, SynapticConnection, NeuralPathway } from '@/types';

interface Props {
  pathways: NeuralPathway[];
}

const NeuralPathwaysSidebar: React.FC<Props> = ({ pathways }) => (
  <aside className={styles.sidebar}>
    <h2 className={styles.animatedTitle}>Neural Pathways</h2>
    <ul className={styles.pathwayList}>
      {pathways.map((pathway) => (
        <li key={pathway.id} className={styles.pathwayItem}>
          <span className={styles.pathwayLabel}>{pathway.label}</span>
        </li>
      ))}
    </ul>
  </aside>
);

export default NeuralPathwaysSidebar;