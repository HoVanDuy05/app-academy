import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text as RNText,
  ViewStyle,
  DimensionValue,
} from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loading from './Loading';

// Table Column Definition
interface Column<T> {
  key: string;
  title: string;
  width?: number | string;
  render?: (item: T, index: number) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

// Table Props
interface DynamicTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  onRowPress?: (item: T) => void;
  loading?: boolean;
  emptyMessage?: string;
  headerStyle?: ViewStyle;
  rowStyle?: ViewStyle;
  refreshing?: boolean;
  onRefresh?: () => void;
  ListHeaderComponent?: React.ReactNode;
  ListFooterComponent?: React.ReactNode;
}

export function DynamicTable<T>({
  data,
  columns,
  keyExtractor,
  onRowPress,
  loading = false,
  emptyMessage = 'Không có dữ liệu',
  headerStyle,
  rowStyle,
  refreshing = false,
  onRefresh,
  ListHeaderComponent,
  ListFooterComponent,
}: DynamicTableProps<T>) {
  const theme = useTheme();

  // Render table header
  const renderHeader = () => (
    <View
      style={[
        styles.header,
        { backgroundColor: theme.colors.surfaceVariant },
        headerStyle,
      ]}
    >
      {columns.map((column) => (
        <View
          key={column.key}
          style={[
            styles.cell,
            { width: (column.width || `${100 / columns.length}%`) as DimensionValue },
          ]}
        >
          <Text
            variant="labelMedium"
            style={[
              styles.headerText,
              { color: theme.colors.onSurfaceVariant },
              column.align && { textAlign: column.align },
            ]}
          >
            {column.title}
          </Text>
        </View>
      ))}
    </View>
  );

  // Render table row
  const renderRow = ({ item, index }: { item: T; index: number }) => {
    const Row: React.ElementType = onRowPress ? TouchableOpacity : View;
    const rowProps = onRowPress
      ? { onPress: () => onRowPress(item), activeOpacity: 0.7 }
      : {};

    return (
      <Row
        style={[
          styles.row,
          { borderBottomColor: theme.colors.outline },
          index % 2 === 1 && { backgroundColor: theme.colors.surfaceVariant + '40' },
          rowStyle,
        ]}
        {...rowProps}
      >
        {columns.map((column) => (
          <View
            key={column.key}
            style={[
              styles.cell,
              { width: (column.width ? column.width : `${100 / columns.length}%`) as DimensionValue },
            ]}
          >
            {column.render ? (
              column.render(item, index)
            ) : (
              <Text
                variant="bodyMedium"
                style={[styles.cellText, column.align && { textAlign: column.align }]}
              >
                {(item as any)[column.key]?.toString() || '-'}
              </Text>
            )}
          </View>
        ))}
      </Row>
    );
  };

  // Render empty state
  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceDisabled }}>
        {emptyMessage}
      </Text>
    </View>
  );

  if (loading) {
    return <Loading message="Đang tải dữ liệu..." fullscreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {ListHeaderComponent}
      {renderHeader()}
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderRow}
        ListEmptyComponent={renderEmpty}
        refreshing={refreshing}
        onRefresh={onRefresh}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={data.length === 0 && styles.emptyContent}
      />
      {ListFooterComponent}
    </SafeAreaView>
  );
}

// Simple Data Table for basic use cases
interface SimpleTableProps {
  headers: string[];
  data: (string | number | React.ReactNode)[][];
  loading?: boolean;
  emptyMessage?: string;
}

export const SimpleTable: React.FC<SimpleTableProps> = ({
  headers,
  data,
  loading = false,
  emptyMessage = 'Không có dữ liệu',
}) => {
  const theme = useTheme();

  if (loading) {
    return <Loading message="Đang tải..." />;
  }

  if (data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={{ color: theme.colors.onSurfaceDisabled }}>{emptyMessage}</Text>
      </View>
    );
  }

  return (
    <View style={styles.simpleContainer}>
      {/* Header */}
      <View style={[styles.simpleRow, { backgroundColor: theme.colors.surfaceVariant }]}>
        {headers.map((header, index) => (
          <View key={index} style={[styles.simpleCell, { flex: 1 }]}>
            <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>
              {header}
            </Text>
          </View>
        ))}
      </View>

      {/* Data Rows */}
      {data.map((row, rowIndex) => (
        <View
          key={rowIndex}
          style={[
            styles.simpleRow,
            {
              borderBottomWidth: 1,
              borderBottomColor: theme.colors.outline,
            },
            rowIndex % 2 === 1 && { backgroundColor: theme.colors.surfaceVariant + '40' },
          ]}
        >
          {row.map((cell, cellIndex) => (
            <View key={cellIndex} style={[styles.simpleCell, { flex: 1 }]}>
              {typeof cell === 'string' || typeof cell === 'number' ? (
                <Text variant="bodyMedium">{cell}</Text>
              ) : (
                cell
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerText: {
    fontWeight: '600',
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
  },
  cell: {
    paddingHorizontal: 4,
    justifyContent: 'center',
  },
  cellText: {
    textAlign: 'left',
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  },
  emptyContent: {
    flex: 1,
    justifyContent: 'center',
  },
  simpleContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  simpleRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  simpleCell: {
    paddingHorizontal: 4,
  },
});

export default DynamicTable;
